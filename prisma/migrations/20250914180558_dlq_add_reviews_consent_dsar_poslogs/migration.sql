-- CreateTable
CREATE TABLE "public"."CookieConsent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "choice" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CookieConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DSARRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'received',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DSARRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PosWebhookLog" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "eventType" TEXT,
    "payload" JSONB NOT NULL,
    "signature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PosWebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CookieConsent_userId_createdAt_idx" ON "public"."CookieConsent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "DSARRequest_email_createdAt_idx" ON "public"."DSARRequest"("email", "createdAt");

-- CreateIndex
CREATE INDEX "Review_orderId_idx" ON "public"."Review"("orderId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "public"."Review"("userId");

-- AddForeignKey
ALTER TABLE "public"."CookieConsent" ADD CONSTRAINT "CookieConsent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DSARRequest" ADD CONSTRAINT "DSARRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
