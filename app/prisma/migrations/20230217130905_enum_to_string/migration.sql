/*
  Warnings:

  - The `worker_type` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "worker_type",
ADD COLUMN     "worker_type" TEXT;

-- DropEnum
DROP TYPE "WorkerType";
