-- CreateEnum
CREATE TYPE "public"."PartnerType" AS ENUM ('DRIVER', 'MERCHANT', 'LTD');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('NEW', 'REVIEWING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."PartnerApplication" (
    "id" TEXT NOT NULL,
    "type" "public"."PartnerType" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "payload" JSONB NOT NULL,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerApplication_pkey" PRIMARY KEY ("id")
);
