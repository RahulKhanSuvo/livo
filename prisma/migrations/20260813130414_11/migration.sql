/*
  Warnings:

  - You are about to drop the column `color` on the `ProductVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductImageType" AS ENUM ('MAIN', 'HOVER', 'GALLERY');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('SALE', 'TRENDING');

-- DropIndex
DROP INDEX "ProductVariant_productId_color_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "assemblyRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "depth" DECIMAL(10,2),
ADD COLUMN     "finish" TEXT,
ADD COLUMN     "height" DECIMAL(10,2),
ADD COLUMN     "weightKg" DECIMAL(10,2),
ADD COLUMN     "width" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "type" "ProductImageType" NOT NULL DEFAULT 'GALLERY';

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "color",
ADD COLUMN     "colorHex" TEXT;

-- CreateTable
CREATE TABLE "ProductBadge" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "BadgeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductBadge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_key" ON "ProductVariant"("productId");

-- AddForeignKey
ALTER TABLE "ProductBadge" ADD CONSTRAINT "ProductBadge_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
