-- CreateTable
CREATE TABLE "license_keys" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripeSessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'granted',
    "expiresAt" TIMESTAMP(3),
    "emailedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "license_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "license_keys_key_key" ON "license_keys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "license_keys_stripeSubscriptionId_key" ON "license_keys"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "license_keys_stripeSessionId_key" ON "license_keys"("stripeSessionId");

