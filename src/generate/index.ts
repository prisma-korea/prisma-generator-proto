import * as fs from "fs-extra";
import * as path from "path";

import { DMMF } from "@prisma/generator-helper";
import { exec } from "child_process";
import { generate } from "./eta";

async function writeFileAnywhere(
  filepath: string,
  data: string
): Promise<void> {
  await fs.ensureDir(path.dirname(filepath));
  return fs.writeFile(filepath, data);
}

/** Find the absolute path to the parent project. */
function findParentPath(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Assuming Prisma generator is run inside the parent project,
    // `npm prefix` command will return the absolute path to
    // the directory containing parent project's `package.json` file.
    exec("npm prefix", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.trim());
      }
    });
  });
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
  const absoluteParentPath = await findParentPath();

  await fs.copy(path.join(__dirname, "../../template"), outdir, {
    overwrite: true,
    recursive: true,
  });

  await writeFileAnywhere(
    path.join(outdir, "package.json"),
    await generate("/views/package.json.eta", {
      parentLink: path.relative(outdir, absoluteParentPath),
    })
  );
  await writeFileAnywhere(
    path.join(outdir, "tsconfig.json"),
    await generate("/views/tsconfig.json.eta", {
      prismaClientRelativePath: path.relative(outdir, prismaClientPath),
    })
  );
  await writeFileAnywhere(
    path.join(outdir, "app/prisma.tsx"),
    await generate("/views/prisma.tsx.eta", {
      prismaClientModule: path.join(
        "parent",
        path.relative(absoluteParentPath, prismaClientPath)
      ),
    })
  );
  await writeFileAnywhere(
    path.join(outdir, "app/routes/index.tsx"),
    await generate("/views/home.tsx.eta", { models: dmmf.datamodel.models })
  );

  for (const model of dmmf.datamodel.models) {
    await writeFileAnywhere(
      path.join(outdir, `app/routes/${model.name}.tsx`),
      await generate("/views/model.tsx.eta", { model })
    );
  }
}
