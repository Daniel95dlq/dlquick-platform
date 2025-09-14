-- CreateTable
CREATE TABLE "public"."QuoteActivity" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "changedBy" TEXT,
    "fromStatus" "public"."QuoteStatus" NOT NULL,
    "toStatus" "public"."QuoteStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuoteActivity_quoteId_idx" ON "public"."QuoteActivity"("quoteId");

-- CreateIndex
CREATE INDEX "QuoteActivity_changedBy_idx" ON "public"."QuoteActivity"("changedBy");

-- AddForeignKey
ALTER TABLE "public"."QuoteActivity" ADD CONSTRAINT "QuoteActivity_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuoteActivity" ADD CONSTRAINT "QuoteActivity_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
