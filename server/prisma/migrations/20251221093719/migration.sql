/*
  Warnings:

  - The values [FAILED] on the enum `LabOrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACCEPTED] on the enum `RecommendationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LabOrderStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."LabOrder" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LabOrder" ALTER COLUMN "status" TYPE "LabOrderStatus_new" USING ("status"::text::"LabOrderStatus_new");
ALTER TYPE "LabOrderStatus" RENAME TO "LabOrderStatus_old";
ALTER TYPE "LabOrderStatus_new" RENAME TO "LabOrderStatus";
DROP TYPE "public"."LabOrderStatus_old";
ALTER TABLE "LabOrder" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RecommendationStatus_new" AS ENUM ('PENDING', 'DISMISSED', 'ORDERED');
ALTER TABLE "public"."LabRecommendation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LabRecommendation" ALTER COLUMN "status" TYPE "RecommendationStatus_new" USING ("status"::text::"RecommendationStatus_new");
ALTER TYPE "RecommendationStatus" RENAME TO "RecommendationStatus_old";
ALTER TYPE "RecommendationStatus_new" RENAME TO "RecommendationStatus";
DROP TYPE "public"."RecommendationStatus_old";
ALTER TABLE "LabRecommendation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
