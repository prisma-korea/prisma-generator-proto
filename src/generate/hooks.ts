import { DMMF } from "@prisma/generator-helper";

const FIELD_TO_TS = new Map<
  DMMF.Field["type"],
  { type: string; initial: unknown }
>([
  ["String", { type: "string", initial: "" }],
  ["Boolean", { type: "boolean", initial: false }],
  ["Int", { type: "number", initial: 0 }],
  ["BigInt", { type: "number", initial: 0 }],
  ["Float", { type: "number", initial: 0 }],
]);

/**
 * Convert Prisma field type to the matching TS type.
 */
function getFieldTsType(field: DMMF.Field): string {
  const fieldMetadata = FIELD_TO_TS.get(field.type);
  if (fieldMetadata === undefined)
    throw new Error(`Unsupported field type ${field.type}`);
  return fieldMetadata.type;
}

/**
 * Calculate the TS type of the model's ID.
 */
function getIdTsType(model: DMMF.Model): string {
  for (const field of model.fields) {
    if (field.isId) return getFieldTsType(field);
  }
  return "never";
}

/**
 * @returns `true` if creating a row will fail without specifying the given field.
 */
function needsInitialValue(field: DMMF.Field): boolean {
  return (
    field.kind === "scalar" && (!field.isRequired || !field.hasDefaultValue)
  );
}

/**
 * Find appropriate initial value for the field.
 */
function getFieldInitialValue(field: DMMF.Field): unknown {
  if (!needsInitialValue(field)) {
    return undefined;
  }
  const fieldMetadata = FIELD_TO_TS.get(field.type);
  if (fieldMetadata === undefined)
    throw new Error(`Unsupported field type ${field.type}`);
  return fieldMetadata.initial;
}

function generateFieldType(field: DMMF.Field): string {
  let fieldType = field.name;
  fieldType += !field.isRequired ? "?: " : ": ";
  fieldType += getFieldTsType(field);
  if (!field.isRequired) {
    fieldType += " | undefined | null";
  }
  return fieldType;
}

/**
 * Make a list of scalar fields from the model.
 */
function filterScalarFields(model: DMMF.Model): DMMF.Field[] {
  return model.fields.filter((field) => field.kind === "scalar");
}

/**
 * Generate part of FormState type.
 */
function generateFormStateElement(field: DMMF.Field): string {
  const fieldTsType = getFieldTsType(field);
  const typeType = `type: "${fieldTsType}"`;
  const valueType = needsInitialValue(field)
    ? `value: ${fieldTsType}`
    : `value?: ${fieldTsType} | undefined`;
  return `${field.name}: {${typeType}; ${valueType}};`;
}

/**
 * Generate TS code for model type declaration.
 *
 * Client code do not handle nested values, so leave them out.
 */
function generateClientType(model: DMMF.Model): string {
  const scalarFields = filterScalarFields(model);
  return `
export type ${model.name} = {
  ${scalarFields.map(generateFieldType).join("\n  ")}
};
export type ${model.name}List = {
  id: ${getIdTsType(model)};
  fields: ${model.name};
}[];
export type ${model.name}FormState = {
  ${scalarFields.map(generateFormStateElement).join("\n  ")}
};`;
}

function generateSingleHook(model: DMMF.Model): string {
  const initialValue: Record<string, unknown> = {};
  for (const field of model.fields) {
    if (field.kind === "scalar") {
      initialValue[field.name] = getFieldInitialValue(field);
      initialValue[field.name] = {
        type: getFieldTsType(field),
        value: getFieldInitialValue(field),
      };
    }
  }

  return `
${generateClientType(model)}
export const use${model.name} = (): [
  ${model.name}List,
  React.FormEventHandler<HTMLFormElement>,
  ${model.name}FormState, 
  React.Dispatch<React.SetStateAction<${model.name}FormState>>,
] => {
  const INITIAL_VALUE: ${model.name}FormState = ${JSON.stringify(initialValue)};

  const [list, setList] = useState<${model.name}List>([]);
  const [formState, setFormState] = useState<${
    model.name
  }FormState>(INITIAL_VALUE);

  useEffect(() => {
    fetch("/api/${model.name.toLowerCase()}", {
      method: "GET"
    })
    .then(res => res.json())
    .then((json: ${
      model.name
    }[]) => setList(json.map(e => ({id: e.id, fields: e}))));
  }, []);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Calculate request payload from form state.
    const payload: Record<string, unknown> = {};
    for (const [key, something] of Object.entries(formState)) {
      payload[key] = something.value;
    }
    fetch("/api/${model.name.toLowerCase()}", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((res) => res.json())
      .then((json: ${model.name}) => {
        setList([...list, {id: json.id, fields: json}]);
      })
      .catch(() => alert("${model.name} could not be created"))
      .finally(() => {
        setFormState(INITIAL_VALUE);
      });
  };

  return [list, addHandler, formState, setFormState];
};
`;
}

export function generateHooks(models: DMMF.Model[]): string {
  const imports = `
import React, {useState, useEffect} from 'react';
`;
  return (
    imports +
    `export type FormFields = {
      name: string;
      type: string;
    }[];` +
    models.map(generateSingleHook).join("\n\n")
  );
}
