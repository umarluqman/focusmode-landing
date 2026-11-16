-- AlterTable
ALTER TABLE "license_keys" ADD COLUMN     "grandfathered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxActivations" INTEGER,
ADD COLUMN     "tier" TEXT;

-- CreateTable
CREATE TABLE "license_activations" (
    "id" TEXT NOT NULL,
    "licenseKeyId" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "license_activations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "license_activations_licenseKeyId_instanceId_key" ON "license_activations"("licenseKeyId", "instanceId");

-- AddForeignKey
ALTER TABLE "license_activations" ADD CONSTRAINT "license_activations_licenseKeyId_fkey" FOREIGN KEY ("licenseKeyId") REFERENCES "license_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

