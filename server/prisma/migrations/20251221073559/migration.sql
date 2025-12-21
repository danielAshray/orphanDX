-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "LabRecommendation" ADD COLUMN     "code" TEXT NOT NULL DEFAULT '90833',
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'HIGH';

-- AlterTable
ALTER TABLE "LabRule" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW';
