import type { ProductStatus } from '@/lib/enums';

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  products: number;
  description: string;
}

export interface SubcategoryItem {
  id: string;
  name: string;
  parent: string;
  parentId: string;
  products: number;
}

export interface ProductTypeItem {
  id: string;
  name: string;
  subcategory: string;
  subcategoryId: string;
  products: number;
}

export interface BrandItem {
  id: string;
  name: string;
  country: string;
  products: number;
  active: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  onHand: number;
  reserved: number;
  available: number;
  reorderPoint: number;
  location: string;
}

export const products: Product[] = [
  {
    id: 'P-1001',
    name: 'Mello Lounge Sofa',
    brand: 'SITS',
    sku: 'SITS-MLO-01',
    category: 'Sofas',
    price: 1290,
    stock: 24,
    status: 'Active',
  },
  {
    id: 'P-1002',
    name: 'Togo Fireside Chair',
    brand: 'TOGO',
    sku: 'TOGO-FIR-04',
    category: 'Chairs',
    price: 980,
    stock: 6,
    status: 'Low',
  },
  {
    id: 'P-1003',
    name: 'Colin - 3 Seater Sofa',
    brand: 'SITS',
    sku: 'SITS-CLN-03',
    category: 'Sofas',
    price: 1500,
    stock: 0,
    status: 'Out of stock',
  },
  {
    id: 'P-1004',
    name: 'Quilted Sectional Module',
    brand: 'HAY',
    sku: 'HAY-QSM-11',
    category: 'Sofas',
    price: 1850,
    stock: 9,
    status: 'Low',
  },
  {
    id: 'P-1005',
    name: 'Rico Curved Sofa',
    brand: 'FERM LIVING',
    sku: 'FL-RCO-07',
    category: 'Sofas',
    price: 2100,
    stock: 14,
    status: 'Active',
  },
  {
    id: 'P-1006',
    name: 'Offset 3-Seater Sofa',
    brand: 'MENU',
    sku: 'MENU-OFS-02',
    category: 'Sofas',
    price: 1650,
    stock: 18,
    status: 'Active',
  },
  {
    id: 'P-1007',
    name: 'Oslo Lounge Chair',
    brand: 'MUUTO',
    sku: 'MUU-OSL-09',
    category: 'Chairs',
    price: 1120,
    stock: 31,
    status: 'Active',
  },
  {
    id: 'P-1008',
    name: 'Beetle Dining Chair',
    brand: 'GUBI',
    sku: 'GUBI-BTL-05',
    category: 'Dining Chairs',
    price: 890,
    stock: 42,
    status: 'Active',
  },
  {
    id: 'P-1009',
    name: 'About A Lounge Chair',
    brand: 'HAY',
    sku: 'HAY-AAL-12',
    category: 'Chairs',
    price: 1450,
    stock: 0,
    status: 'Out of stock',
  },
  {
    id: 'P-1010',
    name: 'Eames Plastic Armchair',
    brand: 'VITRA',
    sku: 'VIT-EAM-08',
    category: 'Chairs',
    price: 760,
    stock: 54,
    status: 'Active',
  },
  {
    id: 'P-1011',
    name: 'Bit Table',
    brand: 'Normann Copenhagen',
    sku: 'NC-BIT-06',
    category: 'Tables',
    price: 599,
    stock: 20,
    status: 'Draft',
  },
  {
    id: 'P-1012',
    name: 'Round Wall Mirror',
    brand: 'FERM LIVING',
    sku: 'FL-RWM-03',
    category: 'Decor',
    price: 350,
    stock: 27,
    status: 'Active',
  },
];

export const categories: CategoryItem[] = [
  {
    id: 'C-01',
    name: 'Living Room',
    slug: 'living-room',
    products: 96,
    description: 'Sofas, chairs and tables for everyday living.',
  },
  {
    id: 'C-02',
    name: 'Dining Room',
    slug: 'dining-room',
    products: 58,
    description: 'Dining tables, chairs and bar furniture.',
  },
  {
    id: 'C-03',
    name: 'Storage & Consoles',
    slug: 'storage-consoles',
    products: 44,
    description: 'TV units, sideboards, bookcases and consoles.',
  },
  {
    id: 'C-04',
    name: 'Bedroom',
    slug: 'bedroom',
    products: 37,
    description: 'Beds, nightstands, dressers and wardrobes.',
  },
  {
    id: 'C-05',
    name: 'Outdoor',
    slug: 'outdoor',
    products: 25,
    description: 'Lounge sets, outdoor sofas and sun loungers.',
  },
  {
    id: 'C-06',
    name: 'Accessories',
    slug: 'accessories',
    products: 61,
    description: 'Lighting, rugs, mirrors, wall art and decor.',
  },
];

export const subcategories: SubcategoryItem[] = [
  { id: 'S-001', name: 'Sofas', parent: 'Living Room', parentId: 'C-01', products: 34 },
  { id: 'S-002', name: 'Chairs', parent: 'Living Room', parentId: 'C-01', products: 28 },
  { id: 'S-003', name: 'Tables', parent: 'Living Room', parentId: 'C-01', products: 22 },
  { id: 'S-004', name: 'Dining Tables', parent: 'Dining Room', parentId: 'C-02', products: 18 },
  { id: 'S-005', name: 'Dining Chairs', parent: 'Dining Room', parentId: 'C-02', products: 24 },
  { id: 'S-006', name: 'Bar Furniture', parent: 'Dining Room', parentId: 'C-02', products: 9 },
  { id: 'S-007', name: 'Storage', parent: 'Storage & Consoles', parentId: 'C-03', products: 26 },
  { id: 'S-008', name: 'Beds', parent: 'Bedroom', parentId: 'C-04', products: 16 },
  { id: 'S-009', name: 'Lighting', parent: 'Accessories', parentId: 'C-06', products: 23 },
];

export const productTypes: ProductTypeItem[] = [
  {
    id: 'T-01',
    name: 'Sectional Sofas',
    subcategory: 'Sofas',
    subcategoryId: 'S-001',
    products: 12,
  },
  { id: 'T-02', name: 'Modular Sofas', subcategory: 'Sofas', subcategoryId: 'S-001', products: 9 },
  { id: 'T-03', name: 'Sofa Beds', subcategory: 'Sofas', subcategoryId: 'S-001', products: 5 },
  {
    id: 'T-04',
    name: 'Accent Chairs',
    subcategory: 'Chairs',
    subcategoryId: 'S-002',
    products: 14,
  },
  {
    id: 'T-05',
    name: 'Lounge Chairs',
    subcategory: 'Chairs',
    subcategoryId: 'S-002',
    products: 11,
  },
  {
    id: 'T-06',
    name: 'Coffee Tables',
    subcategory: 'Tables',
    subcategoryId: 'S-003',
    products: 10,
  },
  { id: 'T-07', name: 'Side Tables', subcategory: 'Tables', subcategoryId: 'S-003', products: 8 },
  { id: 'T-08', name: 'TV Units', subcategory: 'Storage', subcategoryId: 'S-007', products: 7 },
  {
    id: 'T-09',
    name: 'Round Dining Tables',
    subcategory: 'Dining Tables',
    subcategoryId: 'S-004',
    products: 6,
  },
  {
    id: 'T-10',
    name: 'Bar Stools',
    subcategory: 'Bar Furniture',
    subcategoryId: 'S-006',
    products: 9,
  },
  { id: 'T-11', name: 'Platform Beds', subcategory: 'Beds', subcategoryId: 'S-008', products: 8 },
  {
    id: 'T-12',
    name: 'Floor Lamps',
    subcategory: 'Lighting',
    subcategoryId: 'S-009',
    products: 12,
  },
];

export const brands: BrandItem[] = [
  { id: 'B-01', name: 'SITS', country: 'Denmark', products: 11, active: true },
  { id: 'B-02', name: 'HAY', country: 'Denmark', products: 9, active: true },
  { id: 'B-03', name: 'MUUTO', country: 'Denmark', products: 7, active: true },
  { id: 'B-04', name: 'Vitra', country: 'Switzerland', products: 6, active: true },
  { id: 'B-05', name: 'FERM LIVING', country: 'Denmark', products: 8, active: true },
  { id: 'B-06', name: 'MENU', country: 'Denmark', products: 5, active: true },
  { id: 'B-07', name: 'GUBI', country: 'Denmark', products: 4, active: true },
  { id: 'B-08', name: 'TOGO', country: 'France', products: 3, active: false },
  { id: 'B-09', name: 'Normann Copenhagen', country: 'Denmark', products: 6, active: true },
  { id: 'B-10', name: 'NAP', country: 'Finland', products: 1, active: true },
];

export const inventory: InventoryItem[] = [
  {
    id: 'INV-44',
    name: 'Mello Lounge Sofa',
    sku: 'SITS-MLO-01',
    onHand: 24,
    reserved: 3,
    available: 21,
    reorderPoint: 10,
    location: 'WH-A · Aisle 4',
  },
  {
    id: 'INV-18',
    name: 'Togo Fireside Chair',
    sku: 'TOGO-FIR-04',
    onHand: 6,
    reserved: 2,
    available: 4,
    reorderPoint: 8,
    location: 'WH-A · Aisle 2',
  },
  {
    id: 'INV-52',
    name: 'Colin - 3 Seater Sofa',
    sku: 'SITS-CLN-03',
    onHand: 0,
    reserved: 0,
    available: 0,
    reorderPoint: 6,
    location: 'WH-B · Aisle 1',
  },
  {
    id: 'INV-77',
    name: 'Beetle Dining Chair',
    sku: 'GUBI-BTL-05',
    onHand: 42,
    reserved: 6,
    available: 36,
    reorderPoint: 15,
    location: 'WH-B · Aisle 6',
  },
  {
    id: 'INV-31',
    name: 'Eames Plastic Armchair',
    sku: 'VIT-EAM-08',
    onHand: 54,
    reserved: 10,
    available: 44,
    reorderPoint: 20,
    location: 'WH-C · Aisle 3',
  },
  {
    id: 'INV-63',
    name: 'Bit Table',
    sku: 'NC-BIT-06',
    onHand: 20,
    reserved: 4,
    available: 16,
    reorderPoint: 10,
    location: 'WH-C · Aisle 5',
  },
];
