import { z } from 'zod';

export const upsertProductSliderItemSchema = z.object({
  id: z.string().min(1).optional(),
  productId: z.string().min(1),
  mediaUrl: z.string().min(1),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const deleteProductSliderItemSchema = z.object({
  id: z.string().min(1),
});

export type UpsertProductSliderItemInput = z.infer<typeof upsertProductSliderItemSchema>;
export type DeleteProductSliderItemInput = z.infer<typeof deleteProductSliderItemSchema>;
