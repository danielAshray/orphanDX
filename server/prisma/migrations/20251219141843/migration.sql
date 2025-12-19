/*
  Warnings:

  - A unique constraint covering the columns `[patientId,diagnosisId,labRuleId]` on the table `LabRecommendation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `diagnosisId` to the `LabRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LabRecommendation_patientId_labRuleId_key";

-- AlterTable
ALTER TABLE "LabRecommendation" ADD COLUMN     "diagnosisId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LabRecommendation_patientId_diagnosisId_labRuleId_key" ON "LabRecommendation"("patientId", "diagnosisId", "labRuleId");

-- AddForeignKey
ALTER TABLE "LabRecommendation" ADD CONSTRAINT "LabRecommendation_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
