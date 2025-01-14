/*
  Warnings:

  - Added the required column `userId` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameEn" TEXT,
    "manufacturer" TEXT NOT NULL,
    "specification" TEXT NOT NULL,
    "approvalNumber" TEXT NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "storageCondition" TEXT NOT NULL,
    "packageInfo" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    CONSTRAINT "Medicine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medicine" ("approvalNumber", "batchNumber", "createdAt", "description", "expiryDate", "id", "manufacturer", "name", "nameEn", "packageInfo", "quantity", "specification", "storageCondition", "updatedAt") SELECT "approvalNumber", "batchNumber", "createdAt", "description", "expiryDate", "id", "manufacturer", "name", "nameEn", "packageInfo", "quantity", "specification", "storageCondition", "updatedAt" FROM "Medicine";
DROP TABLE "Medicine";
ALTER TABLE "new_Medicine" RENAME TO "Medicine";
CREATE INDEX "Medicine_userId_idx" ON "Medicine"("userId");
CREATE INDEX "Medicine_name_idx" ON "Medicine"("name");
CREATE INDEX "Medicine_deleted_idx" ON "Medicine"("deleted");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
