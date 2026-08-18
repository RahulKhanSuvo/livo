'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getClassificationHierarchyAction = createSafeAction(null, async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
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
});
