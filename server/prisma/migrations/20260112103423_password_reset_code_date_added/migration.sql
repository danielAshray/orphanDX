/*
  Warnings:

  - You are about to drop the column `passwordResetDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetDate",
ADD COLUMN     "passwordResetCodeDate" TIMESTAMP(3);
