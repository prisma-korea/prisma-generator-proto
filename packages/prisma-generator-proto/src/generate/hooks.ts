import { DMMF } from "@prisma/generator-helper";

function generateSingleHook(model: DMMF.Model): string {
  return `
export const use${model.name} = () => {
  const [state, setState] = useState<${model.name}>();
  return state;
};
`;
}

export function generateHooks(models: DMMF.Model[]): string {
  const imports = `
import {useState} from 'react';
import type {${models.map((model) => model.name)}} from '@prisma/client';
`;
  return imports + models.map(generateSingleHook).join("\n\n");
}
