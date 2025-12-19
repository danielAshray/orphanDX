/*
  Warnings:

  - A unique constraint covering the columns `[labId,code]` on the table `LabRule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LabRule_labId_key";

-- CreateIndex
CREATE INDEX "LabRule_labId_idx" ON "LabRule"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "LabRule_labId_code_key" ON "LabRule"("labId", "code");
