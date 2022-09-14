import { DMMF } from "@prisma/generator-helper";
import { generate } from "./eta";

export async function generateHandler(dmmf: DMMF.Document): Promise<string> {
  const datamodelJson = JSON.stringify(dmmf.datamodel);
  const schemaJson = JSON.stringify(dmmf.schema);
  const mappingsJson = JSON.stringify(dmmf.mappings);

  const file = generate("/template/handler.eta", {
    datamodelJson,
    schemaJson,
    mappingsJson,
    models: dmmf.datamodel.models.map((model) => ({
      lowerName: model.name.toLowerCase(),
    })),
  });
  return file;
}
