'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import { requireAdmin } from '@/lib/permissions/require-admin';
import { deleteProductSliderItemSchema } from './product-slider.validation';
import prisma from '@/lib/prisma';

export const deleteProductSliderItemAction = createSafeAction(
  deleteProductSliderItemSchema,
  async ({ id }) => {
    await requireAdmin();
    await prisma.productSliderItem.delete({ where: { id } });
    return { id };
  }
);
