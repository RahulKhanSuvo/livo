// ---------------------------------------------------------------------------
// Modular enums — single source of truth for all string literal unions.
// Values are `as const` objects for tree-shaking. Types are inferred via
// `typeof ... [keyof typeof ...]`.
// ---------------------------------------------------------------------------

// -- Prisma-mirrored enums --------------------------------------------------
export const Role = { USER: 'USER', ADMIN: 'ADMIN' } as const;
export type Role = (typeof Role)[keyof typeof Role];

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// -- Catalog taxonomy -------------------------------------------------------
// Use singular names for both const and type — TypeScript merges them.
// Import as value for runtime, as type for annotations.
export const TaxonomyLevel = {
  CATEGORY: 'category',
  SUBCATEGORY: 'subcategory',
  PRODUCT_TYPE: 'productType',
} as const;
export type TaxonomyLevel = (typeof TaxonomyLevel)[keyof typeof TaxonomyLevel];

export const ModalMode = { ADD: 'add', EDIT: 'edit' } as const;
export type ModalMode = (typeof ModalMode)[keyof typeof ModalMode];

// -- Catalog products -------------------------------------------------------
export const ProductStatus = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  OUT_OF_STOCK: 'Out of stock',
  LOW: 'Low',
} as const;
export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
