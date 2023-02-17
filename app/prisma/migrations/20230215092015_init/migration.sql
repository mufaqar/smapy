-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "avatar_url" TEXT,
    "address" TEXT,
    "acceptedTermsAndConditions" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "email_new_value" TEXT,
    "email_time" TIMESTAMP(3),
    "email_verificationCode" TEXT,
    "email_verified" TIMESTAMP(3),
    "phone_new_value" TEXT,
    "phone_time" TIMESTAMP(3),
    "phone_verificationCode" TEXT,
    "phone_verified" TIMESTAMP(3),

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);
