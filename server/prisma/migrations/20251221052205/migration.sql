-- CreateEnum
CREATE TYPE "LabOrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'FAILED');

-- DropIndex
DROP INDEX "User_role_idx";

-- CreateTable
CREATE TABLE "LabOrder" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "diagnosisId" TEXT NOT NULL,
    "recommendationId" TEXT,
    "status" "LabOrderStatus" NOT NULL DEFAULT 'PENDING',
    "results" TEXT,
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabOrder_recommendationId_key" ON "LabOrder"("recommendationId");

-- CreateIndex
CREATE INDEX "LabOrder_facilityId_idx" ON "LabOrder"("facilityId");

-- CreateIndex
CREATE INDEX "LabOrder_labId_idx" ON "LabOrder"("labId");

-- CreateIndex
CREATE INDEX "LabOrder_diagnosisId_idx" ON "LabOrder"("diagnosisId");

-- CreateIndex
CREATE INDEX "LabOrder_recommendationId_idx" ON "LabOrder"("recommendationId");

-- CreateIndex
CREATE INDEX "User_organizationId_idx" ON "User"("organizationId");

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "LabRecommendation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
