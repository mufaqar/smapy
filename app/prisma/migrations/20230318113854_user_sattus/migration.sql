-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('init', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "advisor_status" "UserStatus" NOT NULL DEFAULT 'init',
ADD COLUMN     "notes" TEXT;
