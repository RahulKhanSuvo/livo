/*
  Warnings:

  - You are about to drop the column `type` on the `ProductImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ProductImageType";
