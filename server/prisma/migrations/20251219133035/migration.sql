/*
  Warnings:

  - Added the required column `labRuleId` to the `LabRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabRecommendation" ADD COLUMN     "labRuleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LabRecommendation" ADD CONSTRAINT "LabRecommendation_labRuleId_fkey" FOREIGN KEY ("labRuleId") REFERENCES "LabRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
