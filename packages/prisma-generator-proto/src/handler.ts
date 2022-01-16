import { DMMF } from "@prisma/generator-helper";

export function generateHandler(dmmf: DMMF.Document): string {
  const datamodelJson = JSON.stringify(dmmf.datamodel);
  const file = `import { Router } from "express";
export const router = Router();

router.get("/datamodels", (req, res) => {
  res.send(${datamodelJson});
})
`;
  return file;
}
