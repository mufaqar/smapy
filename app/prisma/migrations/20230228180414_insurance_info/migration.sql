-- CreateEnum
CREATE TYPE "InsuranceStatus" AS ENUM ('init', 'approved', 'cancled');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'na');

-- CreateEnum
CREATE TYPE "Smoking" AS ENUM ('yes', 'no', 'stop');

-- CreateEnum
CREATE TYPE "FamilyStatus" AS ENUM ('Single', 'Married', 'Divorced', 'Separated', 'Widowed');

-- AlterTable
ALTER TABLE "lifeInsurance" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "load_tracks" JSONB,
ADD COLUMN     "loan_tracks_count" INTEGER,
ADD COLUMN     "status" "InsuranceStatus" NOT NULL DEFAULT 'init',
ADD COLUMN     "statusDate" TIMESTAMP(3),
ADD COLUMN     "total" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "userId" TEXT,
    "userProfileId" TEXT,
    "gender" "Gender",
    "smoking" "Smoking",
    "smoking_stop_month" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "family_status" "FamilyStatus" NOT NULL,
    "birthDate" TIMESTAMP(3),
    "occupation" TEXT,
    "dangerous_hobby_has" BOOLEAN,
    "dangerous_hobby" TEXT,
    "dangerous_hobby_desc" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_userId_key" ON "customer"("userId");

-- AddForeignKey
ALTER TABLE "lifeInsurance" ADD CONSTRAINT "lifeInsurance_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
