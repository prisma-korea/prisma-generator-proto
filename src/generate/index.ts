import * as fs from "fs-extra";
import * as path from "path";

import { DMMF } from "@prisma/generator-helper";
import { generate } from "./eta";

async function writeFileAnywhere(
  filepath: string,
  data: string
): Promise<void> {
  await fs.ensureDir(path.dirname(filepath));
  return fs.writeFile(filepath, data);
}

/**
 * Generate files and save them under the output directory.
 * @param dmmf DMMF document from parsed Prisma schema.
 * @param outdir Path to output directory.
 * @param prismaClientPath Path to the generated prisma client.
 */
export async function generateAndEmit(
  dmmf: DMMF.Document,
  outdir: string,
  prismaClientPath: string
): Promise<void> {
  await fs.copy(path.join(__dirname, "../../template"), outdir, {
    overwrite: true,
    recursive: true,
  });

  await writeFileAnywhere(
    path.join(outdir, "tsconfig.json"),
    await generate("/views/tsconfig.json.eta", {
      prismaClientRelativePath: path.relative(outdir, prismaClientPath),
    })
  );
  await writeFileAnywhere(
    path.join(outdir, "app/routes/index.tsx"),
    await generate("/views/home.tsx.eta", { models: dmmf.datamodel.models })
  );
}
