/*
  Warnings:

  - Added the required column `createdById` to the `LabOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabOrder" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LabOrder" ADD CONSTRAINT "LabOrder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
