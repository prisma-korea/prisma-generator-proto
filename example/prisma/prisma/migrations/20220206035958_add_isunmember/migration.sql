-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "population" INTEGER NOT NULL DEFAULT 0,
    "isUnMember" BOOLEAN NOT NULL DEFAULT false,
    "continentId" TEXT NOT NULL,
    CONSTRAINT "Country_continentId_fkey" FOREIGN KEY ("continentId") REFERENCES "Continent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Country" ("continentId", "id", "name", "population") SELECT "continentId", "id", "name", "population" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
