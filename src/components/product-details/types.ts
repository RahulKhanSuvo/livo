import { Prisma } from '@/generated/prisma/client';

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    variants: {
      include: {
        images: true;
      };
    };
    brand: true;
    material: true;
    productType: {
      include: {
        subCategory: {
          include: {
            category: true;
          };
        };
      };
    };
  };
}>;
