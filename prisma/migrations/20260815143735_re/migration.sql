/*
  Warnings:

  - You are about to alter the column `depth` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `height` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `weightKg` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `width` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to drop the column `price` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "salePrice" DOUBLE PRECISION,
ALTER COLUMN "depth" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "weightKg" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "width" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "price",
DROP COLUMN "salePrice";
