/*
  Warnings:

  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `material` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `depth` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weightKg` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salePrice` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "brand" SET NOT NULL,
ALTER COLUMN "material" SET NOT NULL,
ALTER COLUMN "depth" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "weightKg" SET NOT NULL,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "salePrice" SET NOT NULL,
ALTER COLUMN "salePrice" SET DEFAULT 0;
