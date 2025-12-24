/*
  Warnings:

  - The values [PENDING,SCHEDULED] on the enum `LabOrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `scheduledAt` on the `LabOrder` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LabOrderStatus_new" AS ENUM ('ORDERED', 'COLLECTED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."LabOrder" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LabOrder" ALTER COLUMN "status" TYPE "LabOrderStatus_new" USING ("status"::text::"LabOrderStatus_new");
ALTER TYPE "LabOrderStatus" RENAME TO "LabOrderStatus_old";
ALTER TYPE "LabOrderStatus_new" RENAME TO "LabOrderStatus";
DROP TYPE "public"."LabOrderStatus_old";
ALTER TABLE "LabOrder" ALTER COLUMN "status" SET DEFAULT 'ORDERED';
COMMIT;

-- AlterTable
ALTER TABLE "LabOrder" DROP COLUMN "scheduledAt",
ALTER COLUMN "status" SET DEFAULT 'ORDERED';
