/*
  Warnings:

  - A unique constraint covering the columns `[myReferralCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "myReferralCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_myReferralCode_key" ON "User"("myReferralCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "User"("myReferralCode") ON DELETE SET NULL ON UPDATE CASCADE;
