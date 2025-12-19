-- CreateEnum
CREATE TYPE "RecommendationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DISMISSED', 'ORDERED');

-- CreateTable
CREATE TABLE "LabRecommendationDiagnosis" (
    "id" TEXT NOT NULL,
    "labRecommendationId" TEXT NOT NULL,
    "diagnosisId" TEXT NOT NULL,

    CONSTRAINT "LabRecommendationDiagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabRecommendation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "facilityId" TEXT,
    "providerId" TEXT,
    "title" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RecommendationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabRecommendationDiagnosis_diagnosisId_idx" ON "LabRecommendationDiagnosis"("diagnosisId");

-- CreateIndex
CREATE UNIQUE INDEX "LabRecommendationDiagnosis_labRecommendationId_diagnosisId_key" ON "LabRecommendationDiagnosis"("labRecommendationId", "diagnosisId");

-- CreateIndex
CREATE INDEX "LabRecommendation_patientId_idx" ON "LabRecommendation"("patientId");

-- CreateIndex
CREATE INDEX "LabRecommendation_facilityId_idx" ON "LabRecommendation"("facilityId");

-- CreateIndex
CREATE INDEX "LabRecommendation_providerId_idx" ON "LabRecommendation"("providerId");

-- AddForeignKey
ALTER TABLE "LabRecommendationDiagnosis" ADD CONSTRAINT "LabRecommendationDiagnosis_labRecommendationId_fkey" FOREIGN KEY ("labRecommendationId") REFERENCES "LabRecommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabRecommendationDiagnosis" ADD CONSTRAINT "LabRecommendationDiagnosis_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabRecommendation" ADD CONSTRAINT "LabRecommendation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
