/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "accountNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Facility_accountNumber_key" ON "Facility"("accountNumber");
