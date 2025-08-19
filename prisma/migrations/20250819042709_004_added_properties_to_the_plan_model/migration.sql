-- AlterTable
ALTER TABLE "public"."PaymentPlans" ADD COLUMN     "retryTimes" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "statusAfterRetry" TEXT NOT NULL DEFAULT 'unpaid';
