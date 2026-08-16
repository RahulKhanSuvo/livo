'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { FilterGroup } from '@/data/filter-sidebar.data';
import { z } from 'zod';
import { Prisma } from '@/generated/prisma/client';

const getFilterOptionsSchema = z.object({
  category: z.string().trim().optional(),
  subcategory: z.string().trim().optional(),
});

export const getFilterOptionsAction = createSafeAction(
  getFilterOptionsSchema,
  async ({ category, subcategory }) => {
    const productWhereConditions: Prisma.ProductWhereInput[] = [];

    if (category && category !== 'all') {
      const normalizedCategory = category.toLowerCase().trim();
      const categoryBase = normalizedCategory.replace(/-room$/, '').replace(/-/g, ' ');

      productWhereConditions.push({
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

    if (subcategory && subcategory !== 'all') {
      const normalizedSubCategory = subcategory.toLowerCase().trim();
      const cleanSubName = normalizedSubCategory.replace(/-/g, ' ');

      productWhereConditions.push({
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

    const productWhere: Prisma.ProductWhereInput =
      productWhereConditions.length > 0 ? { AND: productWhereConditions } : {};

    const productTypeWhere: Prisma.ProductTypeWhereInput = {};

    if (subcategory && subcategory !== 'all') {
      const normalizedSubCategory = subcategory.toLowerCase().trim();
      const cleanSubName = normalizedSubCategory.replace(/-/g, ' ');
      productTypeWhere.subCategory = {
        OR: [
          { slug: { contains: normalizedSubCategory, mode: 'insensitive' } },
          { name: { contains: cleanSubName, mode: 'insensitive' } },
        ],
      };
    } else if (category && category !== 'all') {
      const normalizedCategory = category.toLowerCase().trim();
      const categoryBase = normalizedCategory.replace(/-room$/, '').replace(/-/g, ' ');
      productTypeWhere.subCategory = {
        category: {
          OR: [
            { slug: { equals: normalizedCategory, mode: 'insensitive' } },
            { slug: { equals: categoryBase, mode: 'insensitive' } },
            { name: { contains: categoryBase, mode: 'insensitive' } },
          ],
        },
      };
    }

    const hasFilter = productWhereConditions.length > 0;

    const [
      brands,
      productTypes,
      materials,
      inStockCount,
      outOfStockCount,
      under500Count,
      between500And1000Count,
      over1000Count,
    ] = await Promise.all([
      prisma.brand.findMany({
        where: hasFilter ? { products: { some: productWhere } } : {},
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: hasFilter ? { where: productWhere } : true },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.productType.findMany({
        where: productTypeWhere,
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: hasFilter ? { where: productWhere } : true },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.material.findMany({
        where: hasFilter ? { products: { some: productWhere } } : {},
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: hasFilter ? { where: productWhere } : true },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.product.count({
        where: {
          ...productWhere,
          variants: {
            some: {
              stock: { gt: 0 },
            },
          },
        },
      }),
      prisma.product.count({
        where: {
          ...productWhere,
          variants: {
            every: {
              stock: { equals: 0 },
            },
          },
        },
      }),
      prisma.product.count({
        where: {
          ...productWhere,
          price: { lt: 500 },
        },
      }),
      prisma.product.count({
        where: {
          ...productWhere,
          price: { gte: 500, lte: 1000 },
        },
      }),
      prisma.product.count({
        where: {
          ...productWhere,
          price: { gt: 1000 },
        },
      }),
    ]);

    const filterGroups: FilterGroup[] = [];

    if (brands.length > 0) {
      filterGroups.push({
        id: 'brand',
        title: 'Brand',
        options: brands.map((b) => ({
          id: b.id,
          label: b.name,
          count: b._count.products,
        })),
      });
    }

    if (productTypes.length > 0) {
      filterGroups.push({
        id: 'product-type',
        title: 'Product Type',
        options: productTypes.map((pt) => ({
          id: pt.id,
          label: pt.name,
          count: pt._count.products,
        })),
      });
    }

    if (materials.length > 0) {
      filterGroups.push({
        id: 'material',
        title: 'Material & Fabric',
        options: materials.map((m) => ({
          id: m.id,
          label: m.name,
          count: m._count.products,
        })),
      });
    }

    filterGroups.push({
      id: 'price',
      title: 'Price',
      options: [
        { id: 'under-500', label: 'Under $500', count: under500Count },
        { id: '500-1000', label: '$500 - $1,000', count: between500And1000Count },
        { id: 'over-1000', label: 'Over $1,000', count: over1000Count },
      ],
    });

    filterGroups.push({
      id: 'availability',
      title: 'Availability',
      options: [
        { id: 'in-stock', label: 'In Stock', count: inStockCount },
        { id: 'pre-order', label: 'Out of Stock / Pre-order', count: outOfStockCount },
      ],
    });

    return filterGroups;
  },
  { successMessage: 'Filter options fetched successfully' }
);
