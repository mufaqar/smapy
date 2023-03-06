/*
  Warnings:

  - You are about to drop the column `number_of_persons` on the `lifeInsurance` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customer_userId_key";

-- AlterTable
ALTER TABLE "lifeInsurance" DROP COLUMN "number_of_persons",
ADD COLUMN     "number_of_customers" INTEGER NOT NULL DEFAULT 1;
