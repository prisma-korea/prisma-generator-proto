import * as fs from "fs";
import * as path from "path";

import { DMMF } from "@prisma/generator-helper";
import { generateHandler } from "./handler";

/**
 * Generate files and save them under the output directory.
 * @param dmmf DMMF document from parsed Prisma schema.
 * @param outdir Path to output directory.
 */
export async function generateAndEmit(
  dmmf: DMMF.Document,
  outdir: string
): Promise<void> {
  const datamodelJson = JSON.stringify(dmmf.datamodel, null, 2);
  const schemaJson = JSON.stringify(dmmf.schema, null, 2);
  const mappingsJson = JSON.stringify(dmmf.mappings, null, 2);

  await fs.promises.mkdir(outdir, { recursive: true });

  await fs.promises.writeFile(
    path.join(outdir, "routes.ts"),
    generateHandler(dmmf)
  );
  await fs.promises.writeFile(
    path.join(outdir, "datamodel.json"),
    datamodelJson
  );
  await fs.promises.writeFile(path.join(outdir, "schema.json"), schemaJson);
  await fs.promises.writeFile(path.join(outdir, "mappings.json"), mappingsJson);
}
