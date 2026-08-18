'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import { requireAdmin } from '@/lib/permissions/require-admin';
import { upsertProductSliderItemSchema } from './product-slider.validation';
import prisma from '@/lib/prisma';

export const upsertProductSliderItemAction = createSafeAction(
  upsertProductSliderItemSchema,
  async (input) => {
    await requireAdmin();

    const { id, ...rest } = input;

    if (id) {
      return prisma.productSliderItem.update({ where: { id }, data: rest });
    }

    return prisma.productSliderItem.create({
      data: {
        productId: rest.productId,
        mediaUrl: rest.mediaUrl,
        order: rest.order ?? 0,
        isActive: rest.isActive ?? true,
      },
    });
  }
);
