/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `lifeInsurance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "lifeInsurance" DROP CONSTRAINT "lifeInsurance_customerId_fkey";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "lifeInsurance" DROP COLUMN "customerId";

-- CreateTable
CREATE TABLE "lifeInsuranceCustomer" (
    "lifeInsuranceId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "sort" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "lifeInsuranceCustomer_lifeInsuranceId_customerId_key" ON "lifeInsuranceCustomer"("lifeInsuranceId", "customerId");

-- AddForeignKey
ALTER TABLE "lifeInsuranceCustomer" ADD CONSTRAINT "lifeInsuranceCustomer_lifeInsuranceId_fkey" FOREIGN KEY ("lifeInsuranceId") REFERENCES "lifeInsurance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lifeInsuranceCustomer" ADD CONSTRAINT "lifeInsuranceCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
