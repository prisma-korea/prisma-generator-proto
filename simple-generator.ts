import * as fs from "fs";
import * as path from "path";

import { generatorHandler } from "@prisma/generator-helper";

generatorHandler({
  async onGenerate(options) {
    const outdir = options.generator.output?.value;
    if (outdir === undefined) {
      throw new Error("Output directory not specified.");
    }

    const datamodelJson = JSON.stringify(options.dmmf.datamodel, null, 2);
    const schemaJson = JSON.stringify(options.dmmf.schema, null, 2);
    const mappingsJson = JSON.stringify(options.dmmf.mappings, null, 2);

    await fs.promises.mkdir(outdir, { recursive: true });

    await fs.promises.writeFile(
      path.join(outdir, "datamodel.json"),
      datamodelJson
    );
    await fs.promises.writeFile(path.join(outdir, "schema.json"), schemaJson);
    await fs.promises.writeFile(
      path.join(outdir, "mappings.json"),
      mappingsJson
    );
  },
});
