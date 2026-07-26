import productImage from '@/assets/Products/produkt-1-3_d19c7532-696c-4510-bd8f-5e72ba26645f.webp';
import { Product as ProductType } from '@/types/product.type';
import hoverImage from '@/assets/Products/produkt-1-1_669822b9-e521-4819-a32c-fe96a57ca5dc.webp';

export type Product = ProductType;

export const productsData: Product[] = [
  {
    id: 'chair-01',
    brand: 'Nordic Home',
    name: 'Lounge Chair',
    slug: 'lounge-chair',
    category: 'chairs',

    price: 399,
    salePrice: 319,

    badges: [
      {
        id: 'sale',
        label: '20% OFF',
        type: 'sale',
      },
      {
        id: 'trending',
        label: 'Trending',
        type: 'trending',
      },
    ],

    description: 'The Lounge Chair combines modern Scandinavian design with exceptional comfort.',

    specifications: {
      material: {
        frame: 'Solid Oak',
        seat: 'Premium Fabric',
        finish: 'Matte Lacquer',
      },
      dimensions: {
        width: 70,
        height: 82,
        depth: 76,
      },
      weight: '18 kg',
      assemblyRequired: true,
    },

    variants: [
      {
        id: 'black',
        color: 'Black',
        hex: '#111111',
        stock: 12,
        sku: 'LC-BLK-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage, productImage, productImage, productImage],
      },
      {
        id: 'cream',
        color: 'Cream',
        hex: '#F5F5DC',
        stock: 8,
        sku: 'LC-CRM-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage, productImage, productImage, productImage],
      },
      {
        id: 'green',
        color: 'Sage Green',
        hex: '#9CAF88',
        stock: 5,
        sku: 'LC-SGR-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage, productImage, productImage, productImage],
      },
    ],
  },

  {
    id: 'sofa-01',
    brand: 'Nordic Home',
    name: 'Modern Sofa',
    slug: 'modern-sofa',
    category: 'sofas',

    price: 799,

    badges: [
      {
        id: 'eco',
        label: 'Eco Friendly',
        type: 'eco-friendly',
      },
    ],

    description: 'A premium modern sofa for contemporary homes.',

    specifications: {
      material: {
        frame: 'Pine Wood',
        seat: 'Linen Fabric',
        finish: 'Natural',
      },
      dimensions: {
        width: 210,
        height: 90,
        depth: 95,
      },
      weight: '45 kg',
      assemblyRequired: false,
    },

    variants: [
      {
        id: 'cream',
        color: 'Cream',
        hex: '#F5F5DC',
        stock: 6,
        sku: 'MS-CRM-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage],
      },
    ],
  },

  {
    id: 'table-01',
    brand: 'Scandi Living',
    name: 'Oak Dining Table',
    slug: 'oak-dining-table',
    category: 'tables',

    price: 1299,
    salePrice: 1099,

    badges: [
      {
        id: 'sale',
        label: '15% OFF',
        type: 'sale',
      },
    ],

    description: 'A solid oak dining table with clean lines and a natural matte finish.',

    specifications: {
      material: {
        frame: 'Solid Oak',
        seat: 'Oak Veneer',
        finish: 'Matte Lacquer',
      },
      dimensions: {
        width: 180,
        height: 76,
        depth: 90,
      },
      weight: '55 kg',
      assemblyRequired: true,
    },

    variants: [
      {
        id: 'natural',
        color: 'Natural Oak',
        hex: '#C4A97D',
        stock: 5,
        sku: 'ODT-NAT-001',
        mainImage: productImage,
        hoverImage: productImage,
        gallery: [productImage, productImage, productImage],
      },
    ],
  },

  {
    id: 'sofa-02',
    brand: 'Urban Comfort',
    name: 'Sectional Sofa',
    slug: 'sectional-sofa',
    category: 'sofas',

    price: 1899,
    salePrice: 1599,

    badges: [
      {
        id: 'sale',
        label: '15% OFF',
        type: 'sale',
      },
      {
        id: 'best-seller',
        label: 'Best Seller',
        type: 'best-seller',
      },
    ],

    description: 'A spacious sectional sofa perfect for family gatherings and entertaining guests.',

    specifications: {
      material: {
        frame: 'Hardwood',
        seat: 'Polyester Blend',
        finish: 'Textured Weave',
      },
      dimensions: {
        width: 320,
        height: 85,
        depth: 100,
      },
      weight: '78 kg',
      assemblyRequired: false,
    },

    variants: [
      {
        id: 'grey',
        color: 'Charcoal Grey',
        hex: '#36454F',
        stock: 4,
        sku: 'SS-CGR-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage, productImage, productImage],
      },
    ],
  },

  {
    id: 'table-02',
    brand: 'Minimalist',
    name: 'Coffee Table',
    slug: 'coffee-table',
    category: 'tables',

    price: 349,

    badges: [
      {
        id: 'new',
        label: 'New',
        type: 'new',
      },
    ],

    description: 'A minimalist coffee table with a sleek marble top and black metal legs.',

    specifications: {
      material: {
        frame: 'Steel',
        seat: 'Marble',
        finish: 'Polished',
      },
      dimensions: {
        width: 100,
        height: 40,
        depth: 60,
      },
      weight: '22 kg',
      assemblyRequired: true,
    },

    variants: [
      {
        id: 'white',
        color: 'White Marble',
        hex: '#F0EDE5',
        stock: 9,
        sku: 'CT-WHM-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage],
      },
    ],
  },

  {
    id: 'chair-02',
    brand: 'ErgoForm',
    name: 'Desk Chair',
    slug: 'desk-chair',
    category: 'chairs',

    price: 549,
    salePrice: 469,

    badges: [
      {
        id: 'sale',
        label: '15% OFF',
        type: 'sale',
      },
      {
        id: 'eco',
        label: 'Eco Friendly',
        type: 'eco-friendly',
      },
    ],

    description: 'An ergonomic desk chair designed for long hours of comfortable work.',

    specifications: {
      material: {
        frame: 'Aluminum',
        seat: 'Mesh Fabric',
        finish: 'Powder Coated',
      },
      dimensions: {
        width: 68,
        height: 115,
        depth: 70,
      },
      weight: '16 kg',
      assemblyRequired: true,
    },

    variants: [
      {
        id: 'black',
        color: 'Black Mesh',
        hex: '#1A1A1A',
        stock: 8,
        sku: 'DC-BLM-001',
        mainImage: productImage,
        hoverImage: hoverImage,
        gallery: [productImage, productImage, productImage],
      },
    ],
  },
];
