import { DMMF } from "@prisma/generator-helper";

function singleModelCrud(model: DMMF.Model): string {
  const lowerName = model.name.toLowerCase();
  return `
router.get("/${lowerName}", async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.findMany();
  res.send(queryResult);
});

router.post("/${lowerName}", async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.create({
    data: req.body,
  });
  res.send(queryResult);
});

router.get("/${lowerName}/:id", async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.findUnique({
    where: {id: req.params.id}
  });
  res.send(queryResult);
});

router.put("/${lowerName}/:id", async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.send(queryResult);
});

router.delete("/${lowerName}/:id", async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.delete({
    where: {id: req.params.id },
  });
  res.send(queryResult);
});
`;
}

export function generateCrud(models: DMMF.Model[]): string {
  return models.map(singleModelCrud).join("\n\n");
}
