import { DMMF } from "@prisma/generator-helper";

function generateSingleHook(model: DMMF.Model): string {
  const nameOfId = model.fields.find((field) => field.isId)?.name;

  if (nameOfId === undefined) return "";

  const initialValue: Record<string, unknown> = {};
  for (const field of model.fields) {
    if (!field.isId && field.kind === "scalar") {
      switch (field.type) {
        case "Boolean":
          initialValue[field.name] = false;
          break;
        case "Int" || "BigInt" || "Float":
          initialValue[field.name] = 0;
          break;
        default:
          initialValue[field.name] = "";
      }
    }
  }

  return `
export const use${model.name} = (): [${
    model.name
  }[], React.FormEventHandler<HTMLFormElement>, Omit<${
    model.name
  }, "${nameOfId}">, React.Dispatch<React.SetStateAction<Omit<${
    model.name
  }, "${nameOfId}">>>] => {
    const initialValue = ${JSON.stringify(initialValue)}

  const [state, setState] = useState<${model.name}[]>([]);
  const [values, setValues] = useState(initialValue);

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
import type {${models.map((model) => model.name)}} from '@prisma/client';
`;
  return imports + models.map(generateSingleHook).join("\n\n");
}
