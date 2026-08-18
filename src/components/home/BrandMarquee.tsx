import Image from 'next/image';

import ikeaLogo from '@/assets/mar/Group_1454_2x_ca71a0d1-52f3-4fa1-aa47-fdccb802244c.webp';
import vitraLogo from '@/assets/mar/tradition-logo_2x_95e1e23d-c653-4fb6-9550-9fd91d283b1b.webp';
import group1452Logo from '@/assets/mar/Group_1452_2x_ae12c422-6025-4d38-8b6b-e9bb211f3d2e.webp';
import group1453Logo from '@/assets/mar/Group_1453_2x_8f499999-2ec1-4eee-b326-98c2c8dba7fd.webp';
import { Marquee } from '../ui/marquee';

const brands = [
  {
    id: 1,
    name: 'IKEA',
    logo: ikeaLogo,
  },
  {
    id: 2,
    name: 'Vitra',
    logo: vitraLogo,
  },
  {
    id: 3,
    name: 'Brand',
    logo: group1452Logo,
  },
  {
    id: 4,
    name: 'Brand',
    logo: group1453Logo,
  },
];

export function BrandMarquee() {
  return (
    <section className="">
      <Marquee pauseOnHover className="[--duration:5s]">
        {brands.map((brand) => (
          <div key={brand.id} className="mx-2 flex items-center justify-center">
            <Image
              src={brand.logo}
              alt={brand.name}
              className="h-auto w-auto object-contain transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
