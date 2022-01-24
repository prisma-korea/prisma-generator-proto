# Prisma Generator Proto

## System Requirements

- Node.JS
- [pnpm](https://pnpm.io/)

## First Time Setup

```shell
# Install dependencies.
pnpm i

# First build.
pnpx turbo run build

# Install again (to link bins).
pnpm i

# Run examples.
pnpx turbo run dev
```

## Monorepo Structure

- `example`: An example project demonstrating how to use `@prisma-korea/prisma-generator-proto` package.
- `packages`
  - `prisma-generator-proto`: Generator logic.
