'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { furnitureQuerySchema } from './furniture.validation';
import { Prisma } from '@/generated/prisma/client';

export const getAllFurnitureAction = createSafeAction(
  furnitureQuerySchema,
  async ({
    page,
    limit,
    search,
    category,
    subcategory,
    brand,
    material,
    productType,
    minPrice,
    maxPrice,
    inStock,
    sortBy,
    sortOrder,
  }) => {
    const skip = (page - 1) * limit;

    const whereConditions: Prisma.ProductWhereInput[] = [];

    if (search) {
      whereConditions.push({
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            productType: {
              name: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          },
        ],
      });
    }

    if (category) {
      const normalizedCategory = category.toLowerCase().trim();
      const categoryBase = normalizedCategory.replace(/-room$/, '').replace(/-/g, ' ');

      whereConditions.push({
        productType: {
          subCategory: {
            category: {
              OR: [
                { slug: { equals: normalizedCategory, mode: 'insensitive' } },
                { slug: { equals: categoryBase, mode: 'insensitive' } },
                { name: { contains: categoryBase, mode: 'insensitive' } },
              ],
            },
          },
        },
      });
    }

    if (subcategory) {
      const normalizedSubCategory = subcategory.toLowerCase().trim();
      const cleanSubName = normalizedSubCategory.replace(/-/g, ' ');

      whereConditions.push({
        productType: {
          OR: [
            { slug: { contains: normalizedSubCategory, mode: 'insensitive' } },
            { name: { contains: cleanSubName, mode: 'insensitive' } },
            {
              subCategory: {
                OR: [
                  { slug: { contains: normalizedSubCategory, mode: 'insensitive' } },
                  { name: { contains: cleanSubName, mode: 'insensitive' } },
                ],
              },
            },
          ],
        },
      });
    }

    if (brand) {
      const brandsList = brand
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean);
      if (brandsList.length > 0) {
        whereConditions.push({
          OR: [
            { brandId: { in: brandsList } },
            { brand: { name: { in: brandsList, mode: 'insensitive' } } },
          ],
        });
      }
    }

    if (material) {
      const materialsList = material
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);
      if (materialsList.length > 0) {
        whereConditions.push({
          OR: [
            { materialId: { in: materialsList } },
            { material: { name: { in: materialsList, mode: 'insensitive' } } },
          ],
        });
      }
    }

    if (productType) {
      const typesList = productType
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      if (typesList.length > 0) {
        whereConditions.push({
          OR: [
            { productTypeId: { in: typesList } },
            { productType: { name: { in: typesList, mode: 'insensitive' } } },
            { productType: { slug: { in: typesList, mode: 'insensitive' } } },
          ],
        });
      }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter: Prisma.FloatFilter = {};
      if (minPrice !== undefined) priceFilter.gte = minPrice;
      if (maxPrice !== undefined) priceFilter.lte = maxPrice;
      whereConditions.push({ price: priceFilter });
    }

    if (inStock === 'true') {
      whereConditions.push({
        variants: {
          some: {
            stock: { gt: 0 },
          },
        },
      });
    } else if (inStock === 'false') {
      whereConditions.push({
        variants: {
          every: {
            stock: { equals: 0 },
          },
        },
      });
    }

    const where: Prisma.ProductWhereInput =
      whereConditions.length > 0 ? { AND: whereConditions } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        take: limit,
        skip,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          variants: {
            include: {
              images: true,
            },
          },
          brand: true,
          material: true,
          productType: {
            include: {
              subCategory: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      hasNextPage: skip + products.length < total,
      hasPrevPage: page > 1,
    };
  }
);
