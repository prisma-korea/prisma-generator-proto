import { DMMF } from "@prisma/generator-helper";

export function generateHandler(dmmf: DMMF.Document): string {
  const datamodelJson = JSON.stringify(dmmf.datamodel);
  const schemaJson = JSON.stringify(dmmf.schema);
  const mappingsJson = JSON.stringify(dmmf.mappings);

  const file = `import { Router } from "express";
export const router = Router();

router.get("/datamodel", (req, res) => {
  res.send(${datamodelJson});
});

router.get("/schema", (req, res) => {
  res.send(${schemaJson});
});

router.get("/mappings", (req, res) => {
  res.send(${mappingsJson});
});
`;
  return file;
}
