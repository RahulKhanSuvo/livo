'use server';

import prisma from '@/lib/prisma';

export async function getClassificationHierarchyAction() {
  try {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        subCategories: {
          select: {
            id: true,
            name: true,
            productTypes: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}
