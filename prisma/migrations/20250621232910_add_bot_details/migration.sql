/*
  Warnings:

  - Added the required column `fee` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minAmount` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performance` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "bgColor" TEXT NOT NULL DEFAULT 'bg-white',
ADD COLUMN     "fee" TEXT NOT NULL,
ADD COLUMN     "minAmount" TEXT NOT NULL,
ADD COLUMN     "performance" TEXT NOT NULL,
ALTER COLUMN "stats" SET DEFAULT '{}';
