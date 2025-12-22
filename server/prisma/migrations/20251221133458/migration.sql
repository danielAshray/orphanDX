-- AlterTable
ALTER TABLE "LabOrder" ALTER COLUMN "scheduledAt" DROP NOT NULL,
ALTER COLUMN "scheduledAt" DROP DEFAULT;
