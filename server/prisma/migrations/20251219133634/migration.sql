/*
  Warnings:

  - Added the required column `code` to the `LabRule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `LabRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabRule" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;
