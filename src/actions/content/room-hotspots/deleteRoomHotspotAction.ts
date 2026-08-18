'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import { requireAdmin } from '@/lib/permissions/require-admin';
import { deleteRoomHotspotSchema } from './room-hotspots.validation';
import prisma from '@/lib/prisma';

export const deleteRoomHotspotAction = createSafeAction(deleteRoomHotspotSchema, async ({ id }) => {
  await requireAdmin();
  await prisma.roomHotspot.delete({ where: { id } });
  return { id };
});
