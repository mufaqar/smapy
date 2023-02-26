/*
  Warnings:

  - You are about to drop the column `signed_terms_signature` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "signed_terms_signature";

-- CreateTable
CREATE TABLE "lifeInsurance" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "number_of_persons" INTEGER NOT NULL,

    CONSTRAINT "lifeInsurance_pkey" PRIMARY KEY ("id")
);
