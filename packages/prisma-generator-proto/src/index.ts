#!/usr/bin/env node

import * as fs from "fs";

import { GeneratorConfig, generatorHandler } from "@prisma/generator-helper";

import { generateAndEmit } from "./generate";

/**
 * Ensure prisma-client-js is in the Prisma schema.
 * @param otherGenerators List of other generators in the Prisma schema.
 */
function assertPrismaClientGenerator(otherGenerators: GeneratorConfig[]): void {
  const hasPrismaClientGenerator = otherGenerators.some(
    (generator) => generator.provider.value === "prisma-client-js"
  );

  if (!hasPrismaClientGenerator) {
    throw new Error(
      "Please add prisma-client-js generator in your Prisma schema."
    );
  }
}

/**
 * Remove previously generated files.
 * @param outdir Path to output directory.
 */
async function clean(outdir: string): Promise<void> {
  await fs.promises.rm(outdir, { recursive: true, force: true });
}

const DEFAULT_OUTPUT_DIR = "__generated__";

generatorHandler({
  async onGenerate(options) {
    assertPrismaClientGenerator(options.otherGenerators);

    const outdir = options.generator.output?.value ?? DEFAULT_OUTPUT_DIR;

    await clean(outdir);
    await generateAndEmit(options.dmmf, outdir);
  },
});
