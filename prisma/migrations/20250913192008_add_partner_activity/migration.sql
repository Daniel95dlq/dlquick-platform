-- CreateTable
CREATE TABLE "public"."PartnerApplicationActivity" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "changedBy" TEXT,
    "fromStatus" "public"."ApplicationStatus" NOT NULL,
    "toStatus" "public"."ApplicationStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerApplicationActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PartnerApplicationActivity_applicationId_idx" ON "public"."PartnerApplicationActivity"("applicationId");

-- CreateIndex
CREATE INDEX "PartnerApplicationActivity_changedBy_idx" ON "public"."PartnerApplicationActivity"("changedBy");

-- AddForeignKey
ALTER TABLE "public"."PartnerApplicationActivity" ADD CONSTRAINT "PartnerApplicationActivity_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."PartnerApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PartnerApplicationActivity" ADD CONSTRAINT "PartnerApplicationActivity_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
