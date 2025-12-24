/*
  Warnings:

  - You are about to drop the column `cptCode` on the `LabOrder` table. All the data in the column will be lost.
  - You are about to drop the column `testName` on the `LabOrder` table. All the data in the column will be lost.
  - You are about to drop the `TestResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_labOrderId_fkey";

-- AlterTable
ALTER TABLE "LabOrder" DROP COLUMN "cptCode",
DROP COLUMN "testName",
ADD COLUMN     "resultPdfUrl" TEXT;

-- DropTable
DROP TABLE "TestResult";

-- CreateTable
CREATE TABLE "LabTest" (
    "id" TEXT NOT NULL,
    "labOrderId" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "cptCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabTest_labOrderId_idx" ON "LabTest"("labOrderId");

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_labOrderId_fkey" FOREIGN KEY ("labOrderId") REFERENCES "LabOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
