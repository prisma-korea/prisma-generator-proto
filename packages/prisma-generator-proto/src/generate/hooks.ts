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
 * Find the name of id field from the model. `undefined` if no id.
 */
function findIdFieldName(model: DMMF.Model): string | undefined {
  return model.fields.find((field) => field.isId)?.name;
}

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
 * Find appropriate initial value for the field.
 */
function getFieldInitialValue(field: DMMF.Field): unknown {
  const fieldMetadata = FIELD_TO_TS.get(field.type);
  if (fieldMetadata === undefined)
    throw new Error(`Unsupported field type ${field.type}`);
  return fieldMetadata.initial;
}

function generateFieldType(field: DMMF.Field): string {
  return `${field.name}: ${getFieldTsType(field)} ${
    field.isRequired ? "" : "|null|undefined"
  };`;
}

/**
 * Generate TS code for model type declaration.
 *
 * Client code do not handle nested values, so leave them out.
 * Omit id field from FormValues type if it exists.
 */
function generateClientType(model: DMMF.Model): string {
  const editableFields = model.fields.filter(
    (field) => field.kind === "scalar"
  );
  const idFieldName = findIdFieldName(model);
  const formValueType = idFieldName
    ? `Omit<${model.name}, "${idFieldName}">`
    : model.name;
  return `
export type ${model.name} = {
  ${editableFields.map(generateFieldType).join("\n  ")}
};
export type ${model.name}FormValues = ${formValueType};`;
}

function generateSingleHook(model: DMMF.Model): string {
  const initialValue: Record<string, unknown> = {};
  for (const field of model.fields) {
    if (!field.isId && field.kind === "scalar") {
      initialValue[field.name] = getFieldInitialValue(field);
    }
  }

  return `
${generateClientType(model)}
export const use${model.name} = (): [${
    model.name
  }[], React.FormEventHandler<HTMLFormElement>,
  ${model.name}FormValues, 
  React.Dispatch<React.SetStateAction<${model.name}FormValues>>] => {
  const initialValue = ${JSON.stringify(initialValue)}

  const [state, setState] = useState<${model.name}[]>([]);
  const [values, setValues] = useState<${model.name}FormValues>(initialValue);

  useEffect(() => {
    fetch("/api/${model.name.toLowerCase()}", {
      method: "GET"
    })
    .then(res => res.json())
    .then((json: ${model.name}[]) => setState(json));
  }, [setState]);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    fetch("/api/${model.name.toLowerCase()}", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
    .then((res) => res.json())
      .then((json: ${model.name}) => {
        setState([...state, json]);
      })
      .catch(() => alert("${model.name} could not be created"))
      .finally(() => {
        setValues(initialValue);
      });
  };

  return [state, addHandler, values, setValues];
};
`;
}

export function generateHooks(models: DMMF.Model[]): string {
  const imports = `
import React, {useState, useEffect} from 'react';
`;
  return imports + models.map(generateSingleHook).join("\n\n");
}
