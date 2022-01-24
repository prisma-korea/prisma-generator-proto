# Prisma Generator Proto

Easily generate CMS from your Prisma schema.

## Getting Started

1. Install `@prisma-korea/prisma-generator-proto` package.

   ```shell
   npm install @prisma-korea/prisma-generator-proto
   ```

2. Add the generator to your Prisma schema.

   ```prisma
   generator proto {
     provider = "prisma-generator-proto"
     output = "../src/__generated__"
   }
   ```

3. Import the generated express router from `__generated__/router`
   and generated hooks from `__generated__/hooks`.
