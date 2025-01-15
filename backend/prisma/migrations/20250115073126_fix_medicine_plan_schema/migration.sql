-- CreateTable
CREATE TABLE "MedicinePlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    CONSTRAINT "MedicinePlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedicinePlanDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "planId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "dosage" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MedicinePlanDetail_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MedicinePlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "MedicinePlan_userId_idx" ON "MedicinePlan"("userId");

-- CreateIndex
CREATE INDEX "MedicinePlan_deleted_idx" ON "MedicinePlan"("deleted");

-- CreateIndex
CREATE INDEX "MedicinePlanDetail_planId_idx" ON "MedicinePlanDetail"("planId");

-- CreateIndex
CREATE INDEX "MedicinePlanDetail_medicineId_idx" ON "MedicinePlanDetail"("medicineId");
