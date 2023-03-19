-- CreateTable
CREATE TABLE "contactUsRequest" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product" TEXT,
    "name" TEXT,
    "subject" TEXT,
    "contact_info" TEXT NOT NULL,

    CONSTRAINT "contactUsRequest_pkey" PRIMARY KEY ("id")
);
