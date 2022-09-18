#!/usr/bin/env node

import { GeneratorConfig, generatorHandler } from "@prisma/generator-helper";

import { generateAndEmit } from "./generate";

/**
 * Find the output path of prisma-client-js generator.
 * @param otherGenerators List of other generators in the Prisma schema.
 */
function findPrismaClientPath(otherGenerators: GeneratorConfig[]): string {
  for (const generator of otherGenerators) {
    if (generator.provider.value === "prisma-client-js") {
      const prismaClientPath = generator.output?.value;
      if (prismaClientPath == null) {
        throw new Error(
          "Could not detect output path of prisma-client-js generator."
        );
      }
      return prismaClientPath;
    }
  }

  throw new Error(
    "Please add prisma-client-js generator in your Prisma schema."
  );
}

const DEFAULT_OUTPUT_DIR = "__generated__";

generatorHandler({
  async onGenerate(options) {
    const prismaClientPath = findPrismaClientPath(options.otherGenerators);

    const outdir = options.generator.output?.value ?? DEFAULT_OUTPUT_DIR;

    await generateAndEmit(options.dmmf, outdir, prismaClientPath);
  },
});
