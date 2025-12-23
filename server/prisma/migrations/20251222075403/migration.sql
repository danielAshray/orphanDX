/*
  Warnings:

  - You are about to drop the column `code` on the `LabRecommendation` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `LabRecommendation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LabRecommendation" DROP COLUMN "code",
DROP COLUMN "title",
ADD COLUMN     "cptCode" TEXT NOT NULL DEFAULT 'dummy code',
ADD COLUMN     "testName" TEXT NOT NULL DEFAULT 'dummy test';

-- AlterTable
ALTER TABLE "LabRule" ADD COLUMN     "cptCode" TEXT NOT NULL DEFAULT 'dummy code',
ADD COLUMN     "testName" TEXT NOT NULL DEFAULT 'dummy test';
