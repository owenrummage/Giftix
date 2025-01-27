/*
  Warnings:

  - Added the required column `reservedName` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gift" ADD COLUMN     "reservedName" TEXT NOT NULL;
