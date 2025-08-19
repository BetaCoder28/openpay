-- CreateTable
CREATE TABLE "public"."PaymentPlans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "baseTime" INTEGER NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "numberPeople" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "refreshTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentPlans_pkey" PRIMARY KEY ("id")
);
