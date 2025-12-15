/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `practiceId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `PatientRecommendation` table. All the data in the column will be lost.
  - You are about to drop the `LabUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Practice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Lab` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Lab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityId` to the `PatientRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'FACILITY';

-- DropForeignKey
ALTER TABLE "LabUser" DROP CONSTRAINT "LabUser_labId_fkey";

-- DropForeignKey
ALTER TABLE "LabUser" DROP CONSTRAINT "LabUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "PatientRecommendation" DROP CONSTRAINT "PatientRecommendation_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_userId_fkey";

-- DropIndex
DROP INDEX "Order_providerId_idx";

-- DropIndex
DROP INDEX "Patient_practiceId_idx";

-- DropIndex
DROP INDEX "PatientRecommendation_providerId_idx";

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "logoUrl",
DROP COLUMN "status",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "practiceId",
ADD COLUMN     "facilityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PatientRecommendation" DROP COLUMN "providerId",
ADD COLUMN     "facilityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facilityId" INTEGER,
ADD COLUMN     "labId" INTEGER;

-- DropTable
DROP TABLE "LabUser";

-- DropTable
DROP TABLE "Practice";

-- DropTable
DROP TABLE "Provider";

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "businessEntity" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabOrder" (
    "id" SERIAL NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,
    "facilityId" INTEGER NOT NULL,
    "labId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Facility_email_key" ON "Facility"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_email_key" ON "Lab"("email");

-- CreateIndex
CREATE INDEX "Patient_facilityId_idx" ON "Patient"("facilityId");

-- CreateIndex
CREATE INDEX "PatientRecommendation_facilityId_idx" ON "PatientRecommendation"("facilityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientRecommendation" ADD CONSTRAINT "PatientRecommendation_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
