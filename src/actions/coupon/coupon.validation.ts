import { z } from 'zod';
import { CouponType } from '@/generated/prisma/client';

export const couponQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
});

export const createCouponSchema = z.object({
  code: z.string().trim().min(1).max(50),
  type: z.nativeEnum(CouponType),
  value: z.coerce.number().positive(),
  minOrder: z.coerce.number().min(0).optional(),
  maxUses: z.coerce.number().int().min(0).optional(),
  expiresAt: z.string().trim().optional(),
  active: z.boolean().optional().default(true),
});

export const updateCouponSchema = z.object({
  id: z.string().min(1),
  code: z.string().trim().min(1).max(50).optional(),
  type: z.nativeEnum(CouponType).optional(),
  value: z.coerce.number().positive().optional(),
  minOrder: z.coerce.number().min(0).optional(),
  maxUses: z.coerce.number().int().min(0).optional(),
  expiresAt: z.string().trim().optional(),
  active: z.boolean().optional(),
});

export const deleteCouponSchema = z.object({ id: z.string().min(1) });

export interface CouponRow {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrder: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  active: boolean;
  createdAt: string;
}
