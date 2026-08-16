import headerImage from '@/assets/header/sofa.webp';
import { StaticImageData } from 'next/image';

export interface ShopHeaderInfo {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
}

function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const CATEGORY_MAP: Record<
  string,
  ShopHeaderInfo & { subcategories?: Record<string, ShopHeaderInfo> }
> = {
  'living-room': {
    title: 'Living Room Furniture',
    description:
      'Explore our collection of modern living room furniture, crafted for ultimate comfort and elevated style.',
    imageSrc: headerImage,
    subcategories: {
      'sectional-sofas': {
        title: 'Sectional Sofas',
        description:
          'Versatile sectional sofas designed to expand your living space with comfort and style.',
        imageSrc: headerImage,
      },
      'modular-sofas': {
        title: 'Modular Sofas',
        description: 'Customizable modular sofas tailored for flexible living arrangements.',
        imageSrc: headerImage,
      },
      loveseats: {
        title: 'Loveseats',
        description: 'Cozy, compact loveseats perfect for smaller spaces or paired accent seating.',
        imageSrc: headerImage,
      },
      'sofa-beds': {
        title: 'Sofa Beds',
        description:
          'Multi-functional sofa beds that combine lounge comfort with overnight sleeping.',
        imageSrc: headerImage,
      },
      'recliner-sofas': {
        title: 'Recliner Sofas',
        description: 'Ergonomic recliner sofas designed for maximum relaxation.',
        imageSrc: headerImage,
      },
      'accent-chairs': {
        title: 'Accent Chairs',
        description: "Statement accent chairs to elevate your room's aesthetic.",
        imageSrc: headerImage,
      },
      'lounge-chairs': {
        title: 'Lounge Chairs',
        description: 'Deep, supportive lounge chairs for quiet moments and relaxing evenings.',
        imageSrc: headerImage,
      },
      armchairs: {
        title: 'Armchairs',
        description: 'Classic armchairs offering plush seating and enduring craftsmanship.',
        imageSrc: headerImage,
      },
      recliners: {
        title: 'Recliners',
        description: 'Smooth reclining chairs engineered for luxury relaxation.',
        imageSrc: headerImage,
      },
      'swivel-chairs': {
        title: 'Swivel Chairs',
        description: 'Functional 360-degree swivel chairs for versatile seating.',
        imageSrc: headerImage,
      },
      'coffee-tables': {
        title: 'Coffee Tables',
        description: 'Centerpiece coffee tables combining natural materials and clean lines.',
        imageSrc: headerImage,
      },
      'side-tables': {
        title: 'Side Tables',
        description: 'Convenient side tables designed to accent your seating area.',
        imageSrc: headerImage,
      },
      'console-tables': {
        title: 'Console Tables',
        description: 'Sleek console tables for entryways, hallways, and behind-sofa placement.',
        imageSrc: headerImage,
      },
      'nesting-tables': {
        title: 'Nesting Tables',
        description: 'Space-saving nesting tables that offer flexible surface space.',
        imageSrc: headerImage,
      },
      'end-tables': {
        title: 'End Tables',
        description: 'Compact end tables perfect for drinks, lamps, and daily essentials.',
        imageSrc: headerImage,
      },
      'tv-units': {
        title: 'TV Units',
        description: 'Media consoles and TV units built for organized entertainment.',
        imageSrc: headerImage,
      },
      bookcases: {
        title: 'Bookcases',
        description: 'Open and modular bookcases to display books, objects, and art.',
        imageSrc: headerImage,
      },
      'ottomans-benches': {
        title: 'Ottomans & Benches',
        description: 'Versatile ottomans and benches for footrests, extra seating, or storage.',
        imageSrc: headerImage,
      },
    },
  },
  'dining-room': {
    title: 'Dining Room Furniture',
    description:
      'Gather around timeless dining tables, comfortable dining chairs, and refined storage sideboards.',
    imageSrc: headerImage,
    subcategories: {
      'round-dining-tables': {
        title: 'Round Dining Tables',
        description: 'Intimate round dining tables built for seamless conversation.',
        imageSrc: headerImage,
      },
      'rectangular-dining-tables': {
        title: 'Rectangular Dining Tables',
        description: 'Spacious rectangular dining tables for family gatherings and dinner parties.',
        imageSrc: headerImage,
      },
      'extendable-dining-tables': {
        title: 'Extendable Dining Tables',
        description: 'Flexible extendable tables designed to seat extra guests with ease.',
        imageSrc: headerImage,
      },
      'counter-height-tables': {
        title: 'Counter Height Tables',
        description: 'Elevated counter-height tables for casual dining and modern kitchens.',
        imageSrc: headerImage,
      },
      'upholstered-chairs': {
        title: 'Upholstered Chairs',
        description: 'Plush upholstered dining chairs for extended dinner conversations.',
        imageSrc: headerImage,
      },
      'wooden-chairs': {
        title: 'Wooden Chairs',
        description:
          'Solid wood dining chairs highlighting organic warmth and artisan craftsmanship.',
        imageSrc: headerImage,
      },
      'arm-dining-chairs': {
        title: 'Arm Dining Chairs',
        description: 'Supportive arm dining chairs for captain seats or relaxed dining.',
        imageSrc: headerImage,
      },
      'side-chairs': {
        title: 'Side Chairs',
        description: 'Streamlined side dining chairs that fit effortlessly around any table.',
        imageSrc: headerImage,
      },
      'bar-stools': {
        title: 'Bar Stools',
        description: 'Modern counter and bar stools crafted for comfort at your island or bar.',
        imageSrc: headerImage,
      },
      'bar-tables': {
        title: 'Bar Tables',
        description: 'High bar tables for compact dining nooks and social entertaining.',
        imageSrc: headerImage,
      },
      benches: {
        title: 'Dining Benches',
        description: 'Informal dining benches for flexible seating arrangements.',
        imageSrc: headerImage,
      },
      'sideboards-buffets': {
        title: 'Sideboards & Buffets',
        description: 'Elegant sideboards and buffets providing essential dining storage.',
        imageSrc: headerImage,
      },
    },
  },
  'storage-consoles': {
    title: 'Storage & Consoles',
    description:
      'Sleek storage cabinets, sideboards, bookcases, and TV units designed to declutter with style.',
    imageSrc: headerImage,
    subcategories: {
      'tv-units': {
        title: 'TV Units',
        description: 'Media consoles built for seamless wire management and sleek display.',
        imageSrc: headerImage,
      },
      sideboards: {
        title: 'Sideboards',
        description: 'Functional sideboards combining concealed storage and display surfaces.',
        imageSrc: headerImage,
      },
      cabinets: {
        title: 'Storage Cabinets',
        description: 'Multi-purpose storage cabinets for living, dining, or home office.',
        imageSrc: headerImage,
      },
      bookcases: {
        title: 'Bookcases',
        description: 'Bookcases designed to organize collections and display decor.',
        imageSrc: headerImage,
      },
      'shelving-units': {
        title: 'Shelving Units',
        description: 'Minimalist shelving units providing open architectural display.',
        imageSrc: headerImage,
      },
      'console-tables': {
        title: 'Console Tables',
        description: 'Narrow console tables ideal for foyers, corridors, and living rooms.',
        imageSrc: headerImage,
      },
    },
  },
  bedroom: {
    title: 'Bedroom Furniture',
    description:
      'Transform your bedroom into a serene sanctuary with platform beds, nightstands, and dressers.',
    imageSrc: headerImage,
    subcategories: {
      'platform-beds': {
        title: 'Platform Beds',
        description: 'Low-profile platform beds with clean architectural lines.',
        imageSrc: headerImage,
      },
      'storage-beds': {
        title: 'Storage Beds',
        description: 'Smart storage beds featuring integrated drawers for space saving.',
        imageSrc: headerImage,
      },
      'upholstered-beds': {
        title: 'Upholstered Beds',
        description: 'Soft upholstered bed frames offering plush back support for reading.',
        imageSrc: headerImage,
      },
      'wooden-beds': {
        title: 'Wooden Beds',
        description: 'Natural wood bed frames showcasing rich textures and timeless design.',
        imageSrc: headerImage,
      },
      'canopy-beds': {
        title: 'Canopy Beds',
        description: 'Dramatic canopy beds that create an architectural bedroom focal point.',
        imageSrc: headerImage,
      },
      nightstands: {
        title: 'Nightstands',
        description: 'Bedside nightstands with smooth drawers and ambient surface space.',
        imageSrc: headerImage,
      },
      dressers: {
        title: 'Dressers',
        description: 'Spacious dressers designed for organized clothing storage.',
        imageSrc: headerImage,
      },
      wardrobes: {
        title: 'Wardrobes',
        description: 'Freestanding wardrobes providing ample hanging and shelf storage.',
        imageSrc: headerImage,
      },
      'chest-of-drawers': {
        title: 'Chest of Drawers',
        description: 'Vertical chests of drawers optimized for compact bedroom layouts.',
        imageSrc: headerImage,
      },
      'bedroom-benches': {
        title: 'Bedroom Benches',
        description: 'End-of-bed benches for seating and decorative layer.',
        imageSrc: headerImage,
      },
    },
  },
  outdoor: {
    title: 'Outdoor Furniture',
    description:
      'Weather-resistant outdoor lounges, dining sets, and sun loungers for open-air living.',
    imageSrc: headerImage,
    subcategories: {
      'lounge-sets': {
        title: 'Outdoor Lounge Sets',
        description: 'Complete outdoor seating sets designed for relaxed patio lounging.',
        imageSrc: headerImage,
      },
      'outdoor-sofas': {
        title: 'Outdoor Sofas',
        description: 'All-weather sofas built with durable fabrics and quick-dry cushions.',
        imageSrc: headerImage,
      },
      'outdoor-chairs': {
        title: 'Outdoor Chairs',
        description: 'Ergonomic outdoor armchairs and lounge seating.',
        imageSrc: headerImage,
      },
      'outdoor-dining-sets': {
        title: 'Outdoor Dining Sets',
        description: 'Al fresco dining tables and matching weather-resistant chairs.',
        imageSrc: headerImage,
      },
      'outdoor-tables': {
        title: 'Outdoor Tables',
        description: 'Patio coffee tables, side tables, and outdoor dining surfaces.',
        imageSrc: headerImage,
      },
      'sun-loungers': {
        title: 'Sun Loungers',
        description: 'Adjustable sun loungers for poolside and sunbathing relaxation.',
        imageSrc: headerImage,
      },
    },
  },
  accessories: {
    title: 'Home Accessories',
    description:
      'Curated rugs, lighting, mirrors, and decor objects to complete your home interior.',
    imageSrc: headerImage,
    subcategories: {
      rugs: {
        title: 'Area Rugs',
        description: 'Hand-woven and textured area rugs to anchor your living spaces.',
        imageSrc: headerImage,
      },
      lighting: {
        title: 'Designer Lighting',
        description: 'Ambient floor lamps, pendant lights, and table lamps.',
        imageSrc: headerImage,
      },
      mirrors: {
        title: 'Wall & Floor Mirrors',
        description: 'Reflective wall and floor mirrors that enhance natural light.',
        imageSrc: headerImage,
      },
      'wall-art': {
        title: 'Wall Art',
        description: 'Modern prints and original wall art to bring character to your walls.',
        imageSrc: headerImage,
      },
      cushions: {
        title: 'Decorative Cushions',
        description: 'Soft accent cushions in tactile linen, wool, and velvet fabrics.',
        imageSrc: headerImage,
      },
      throws: {
        title: 'Cozy Throws',
        description: 'Woven throw blankets for warmth and layered styling.',
        imageSrc: headerImage,
      },
      vases: {
        title: 'Ceramic & Glass Vases',
        description: 'Sculptural ceramic and glass vases for floral arrangements.',
        imageSrc: headerImage,
      },
      'decorative-objects': {
        title: 'Decorative Objects',
        description: 'Thoughtfully designed objects and artifacts for shelves and tables.',
        imageSrc: headerImage,
      },
    },
  },
};

// Aliases for slug variations
CATEGORY_MAP['living'] = CATEGORY_MAP['living-room'];
CATEGORY_MAP['dining'] = CATEGORY_MAP['dining-room'];
CATEGORY_MAP['storage'] = CATEGORY_MAP['storage-consoles'];

export function getShopHeaderDetails(category?: string, subcategory?: string): ShopHeaderInfo {
  if (!category) {
    return {
      title: 'Shop All Furniture',
      description:
        'Explore our complete collection of modern, minimalist furniture designed for refined everyday living.',
      imageSrc: headerImage,
    };
  }

  const normalizedCategory = category.toLowerCase().trim();
  const categoryConfig = CATEGORY_MAP[normalizedCategory];

  if (subcategory) {
    const normalizedSub = subcategory.toLowerCase().trim();
    if (categoryConfig?.subcategories?.[normalizedSub]) {
      return categoryConfig.subcategories[normalizedSub];
    }

    return {
      title: formatSlugToTitle(normalizedSub),
      description: `Browse our selected collection of ${formatSlugToTitle(normalizedSub).toLowerCase()}.`,
      imageSrc: headerImage,
    };
  }

  if (categoryConfig) {
    return {
      title: categoryConfig.title,
      description: categoryConfig.description,
      imageSrc: categoryConfig.imageSrc,
    };
  }

  return {
    title: formatSlugToTitle(normalizedCategory),
    description: `Browse our selected collection of ${formatSlugToTitle(normalizedCategory).toLowerCase()}.`,
    imageSrc: headerImage,
  };
}
