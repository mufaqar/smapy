-- CreateEnum
CREATE TYPE "WorkerType" AS ENUM ('freelnacer', 'hired');

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "bank_account" TEXT,
ADD COLUMN     "bank_branch" TEXT,
ADD COLUMN     "bank_branch_number" TEXT,
ADD COLUMN     "bank_details_later" BOOLEAN,
ADD COLUMN     "bank_name" TEXT,
ADD COLUMN     "bank_number" TEXT,
ADD COLUMN     "certificate_id_picture" TEXT,
ADD COLUMN     "certificate_id_picture_later" BOOLEAN,
ADD COLUMN     "number_of_files" INTEGER,
ADD COLUMN     "signed_terms" TIMESTAMP(3),
ADD COLUMN     "signed_terms_signature" TEXT,
ADD COLUMN     "worker_type" "WorkerType",
ADD COLUMN     "workplace_name" TEXT,
ADD COLUMN     "years_experience" INTEGER;
