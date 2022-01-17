import { DMMF } from "@prisma/generator-helper";

function singleModelCrud(model: DMMF.Model): string {
  const lowerName = model.name.toLowerCase();
  return `
router.get("/${lowerName}", wrapAsync(async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.findMany();
  res.send(queryResult);
}));

router.post("/${lowerName}", wrapAsync(async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.create({
    data: req.body,
  });
  res.send(queryResult);
}));

router.get("/${lowerName}/:id", wrapAsync(async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.findUnique({
    where: {id: req.params.id}
  });
  res.send(queryResult);
}));

router.put("/${lowerName}/:id", wrapAsync(async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.send(queryResult);
}));

router.delete("/${lowerName}/:id", wrapAsync(async (req, res, next) => {
  const queryResult = await prisma.${lowerName}.delete({
    where: {id: req.params.id },
  });
  res.send(queryResult);
}));
`;
}

export function generateCrud(models: DMMF.Model[]): string {
  const helpers = `
type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

function wrapAsync(handler: Handler): Handler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}
`;
  return helpers + models.map(singleModelCrud).join("\n\n");
}
