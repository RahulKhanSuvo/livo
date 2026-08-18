import { z } from 'zod';

export const cardPositionSchema = z.enum(['top', 'bottom', 'left', 'right']);

export const upsertRoomHotspotSchema = z.object({
  id: z.string().min(1).optional(),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  cardPosition: cardPositionSchema.nullable().optional(),
  productId: z.string().min(1).nullable().optional(),
  isActive: z.boolean().optional(),
});

export const deleteRoomHotspotSchema = z.object({
  id: z.string().min(1),
});

export type UpsertRoomHotspotInput = z.infer<typeof upsertRoomHotspotSchema>;
export type DeleteRoomHotspotInput = z.infer<typeof deleteRoomHotspotSchema>;
