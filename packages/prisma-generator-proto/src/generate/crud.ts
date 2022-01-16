import { DMMF } from "@prisma/generator-helper";

function singleModelCrud(model: DMMF.Model): string {
  return `
router.get("/${model.name.toLowerCase()}", async (req, res, next) => {
  const queryResult = await prisma.${model.name.toLowerCase()}.findMany();
  res.send(queryResult);
});
`;
}

export function generateCrud(models: DMMF.Model[]): string {
  return models.map(singleModelCrud).join("\n\n");
}
