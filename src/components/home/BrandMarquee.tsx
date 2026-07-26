import Image from 'next/image';

import ikeaLogo from '@/assets/mar/Group_1454_2x_ca71a0d1-52f3-4fa1-aa47-fdccb802244c.webp';
import vitraLogo from '@/assets/mar/logo-philipp_2x_78f312c4-4d9f-41ff-aeb3-d575f6c6251f.avif';
import hayLogo from '@/assets/mar/tradition-logo_2x_95e1e23d-c653-4fb6-9550-9fd91d283b1b.webp';
import muutoLogo from '@/assets/mar/umbtra_2x_f72e03e7-ed78-466f-b5ee-213d2772e689.avif';
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
    name: 'HAY',
    logo: hayLogo,
  },
  {
    id: 4,
    name: 'Muuto',
    logo: muutoLogo,
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
