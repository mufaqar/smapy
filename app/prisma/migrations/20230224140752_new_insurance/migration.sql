/*
  Warnings:

  - Added the required column `advisorId` to the `lifeInsurance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lifeInsurance" ADD COLUMN     "advisorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lifeInsurance" ADD CONSTRAINT "lifeInsurance_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
