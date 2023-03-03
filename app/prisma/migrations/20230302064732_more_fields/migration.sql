/*
  Warnings:

  - You are about to drop the column `load_tracks` on the `lifeInsurance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "apartment_number" TEXT,
ADD COLUMN     "card_id" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "street_number" TEXT;

-- AlterTable
ALTER TABLE "lifeInsurance" DROP COLUMN "load_tracks",
ADD COLUMN     "bank_branch" TEXT,
ADD COLUMN     "bank_branch_number" TEXT,
ADD COLUMN     "bank_name" TEXT,
ADD COLUMN     "bank_number" TEXT,
ADD COLUMN     "details_approval" TIMESTAMP(3),
ADD COLUMN     "insurance_start_date" TIMESTAMP(3),
ADD COLUMN     "loan_tracks" JSONB,
ADD COLUMN     "property_apartment_number" TEXT,
ADD COLUMN     "property_city" TEXT,
ADD COLUMN     "property_street" TEXT,
ADD COLUMN     "property_street_number" TEXT,
ADD COLUMN     "same_address_mortgage" BOOLEAN;
