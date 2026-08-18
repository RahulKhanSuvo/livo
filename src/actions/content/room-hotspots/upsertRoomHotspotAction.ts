'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import { requireAdmin } from '@/lib/permissions/require-admin';
import { upsertRoomHotspotSchema } from './room-hotspots.validation';
import prisma from '@/lib/prisma';

export const upsertRoomHotspotAction = createSafeAction(upsertRoomHotspotSchema, async (input) => {
  await requireAdmin();

  const { id, ...rest } = input;

  if (id) {
    return prisma.roomHotspot.update({ where: { id }, data: rest });
  }

  return prisma.roomHotspot.create({
    data: {
      x: rest.x,
      y: rest.y,
      cardPosition: rest.cardPosition ?? null,
      productId: rest.productId ?? null,
      isActive: rest.isActive ?? true,
    },
  });
});
