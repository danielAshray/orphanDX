/*
  Warnings:

  - You are about to drop the column `diagnosisId` on the `LabOrder` table. All the data in the column will be lost.
  - You are about to drop the column `recommendationId` on the `LabOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[diagnosisId,labRuleId]` on the table `LabRecommendation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LabOrder" DROP CONSTRAINT "LabOrder_diagnosisId_fkey";

-- DropForeignKey
ALTER TABLE "LabOrder" DROP CONSTRAINT "LabOrder_recommendationId_fkey";

-- DropIndex
DROP INDEX "LabOrder_diagnosisId_idx";

-- DropIndex
DROP INDEX "LabOrder_facilityId_idx";

-- DropIndex
DROP INDEX "LabOrder_labId_idx";

-- DropIndex
DROP INDEX "LabOrder_recommendationId_idx";

-- DropIndex
DROP INDEX "LabOrder_recommendationId_key";

-- DropIndex
DROP INDEX "LabRecommendation_patientId_diagnosisId_labRuleId_key";

-- DropIndex
DROP INDEX "LabRecommendation_patientId_idx";

-- AlterTable
ALTER TABLE "LabOrder" DROP COLUMN "diagnosisId",
DROP COLUMN "recommendationId";

-- CreateTable
CREATE TABLE "LabOrderDiagnosis" (
    "id" TEXT NOT NULL,
    "labOrderId" TEXT NOT NULL,
    "diagnosisId" TEXT NOT NULL,

    CONSTRAINT "LabOrderDiagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabOrderRecommendation" (
    "id" TEXT NOT NULL,
    "labOrderId" TEXT NOT NULL,
    "labRecommendationId" TEXT NOT NULL,

    CONSTRAINT "LabOrderRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabOrderDiagnosis_diagnosisId_idx" ON "LabOrderDiagnosis"("diagnosisId");

-- CreateIndex
CREATE UNIQUE INDEX "LabOrderDiagnosis_labOrderId_diagnosisId_key" ON "LabOrderDiagnosis"("labOrderId", "diagnosisId");

-- CreateIndex
CREATE INDEX "LabOrderRecommendation_labRecommendationId_idx" ON "LabOrderRecommendation"("labRecommendationId");

-- CreateIndex
CREATE UNIQUE INDEX "LabOrderRecommendation_labOrderId_labRecommendationId_key" ON "LabOrderRecommendation"("labOrderId", "labRecommendationId");

-- CreateIndex
CREATE INDEX "LabOrder_facilityId_patientId_idx" ON "LabOrder"("facilityId", "patientId");

-- CreateIndex
CREATE INDEX "LabOrder_labId_patientId_idx" ON "LabOrder"("labId", "patientId");

-- CreateIndex
CREATE UNIQUE INDEX "LabRecommendation_diagnosisId_labRuleId_key" ON "LabRecommendation"("diagnosisId", "labRuleId");

-- AddForeignKey
ALTER TABLE "LabOrderDiagnosis" ADD CONSTRAINT "LabOrderDiagnosis_labOrderId_fkey" FOREIGN KEY ("labOrderId") REFERENCES "LabOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrderDiagnosis" ADD CONSTRAINT "LabOrderDiagnosis_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrderRecommendation" ADD CONSTRAINT "LabOrderRecommendation_labOrderId_fkey" FOREIGN KEY ("labOrderId") REFERENCES "LabOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrderRecommendation" ADD CONSTRAINT "LabOrderRecommendation_labRecommendationId_fkey" FOREIGN KEY ("labRecommendationId") REFERENCES "LabRecommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
