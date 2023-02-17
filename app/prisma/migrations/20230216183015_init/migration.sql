/*
  Warnings:

  - You are about to drop the column `name` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_card_number]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "id_card_number" TEXT,
ADD COLUMN     "last_name" TEXT;

-- CreateTable
CREATE TABLE "SystemEvents" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "details" JSONB,

    CONSTRAINT "SystemEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminOperations" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" TEXT NOT NULL,
    "cmd" TEXT NOT NULL,
    "params" TEXT,
    "moreInfo" JSONB,
    "status" TEXT NOT NULL,
    "details" JSONB,

    CONSTRAINT "AdminOperations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_card_number_key" ON "UserProfile"("id_card_number");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_phone_key" ON "UserProfile"("phone");
