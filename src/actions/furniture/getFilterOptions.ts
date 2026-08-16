'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { FilterGroup } from '@/data/filter-sidebar.data';

export const getFilterOptionsAction = createSafeAction(
  null,
  async () => {
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
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.productType.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.material.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.product.count({
        where: {
          variants: {
            some: {
              stock: { gt: 0 },
            },
          },
        },
      }),
      prisma.product.count({
        where: {
          variants: {
            every: {
              stock: { equals: 0 },
            },
          },
        },
      }),
      prisma.product.count({
        where: {
          price: { lt: 500 },
        },
      }),
      prisma.product.count({
        where: {
          price: { gte: 500, lte: 1000 },
        },
      }),
      prisma.product.count({
        where: {
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
