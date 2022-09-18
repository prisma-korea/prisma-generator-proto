# Prisma Generator Proto

Easily generate CMS from your Prisma schema.

## Getting Started

Assuming you have an existing project that uses Prisma.

1. Install `@prisma-korea/prisma-generator-proto` package.

   ```shell
   npm install @prisma-korea/prisma-generator-proto
   ```

2. Add the generator to your Prisma schema.

   ```prisma
   generator proto {
     provider = "prisma-generator-proto"
     output = "../__generated__"
   }
   ```

3. Start the generated CMS.

   ```shell
   cd __generated__
   npm i
   npm run dev
   ```
