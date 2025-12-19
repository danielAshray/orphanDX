/*
  Warnings:

  - You are about to drop the `LabRecommendationDiagnosis` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[patientId,labRuleId]` on the table `LabRecommendation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LabRecommendationDiagnosis" DROP CONSTRAINT "LabRecommendationDiagnosis_diagnosisId_fkey";

-- DropForeignKey
ALTER TABLE "LabRecommendationDiagnosis" DROP CONSTRAINT "LabRecommendationDiagnosis_labRecommendationId_fkey";

-- DropTable
DROP TABLE "LabRecommendationDiagnosis";

-- CreateIndex
CREATE UNIQUE INDEX "LabRecommendation_patientId_labRuleId_key" ON "LabRecommendation"("patientId", "labRuleId");
