import second from '@/assets/background/sp.png';
import Image from 'next/image';
import SpotProductTitle from './SpotTile';
import SpotDataGrid from './SpotDataGrid';

const ProductSpotlight = () => {
  return (
    <section className="relative h-[300vh] bg-[#f0efeb] md:h-[170vh]">
      {/* Sticky Background */}
      <div className="sticky top-0 h-[calc(120vh)] z-10">
        <Image src={second} alt="background" fill priority className="object-cover" />
      </div>

      {/* Scrolling Content */}
      <div className="absolute inset-0 z-10">
        <section className="flex h-[70vh] items-start justify-center md:h-[calc(90vh)]">
          <SpotProductTitle />
        </section>

        <section className="flex h-[220vh] items-center justify-center md:h-[calc(80vh)]">
          <SpotDataGrid />
        </section>
      </div>
    </section>
  );
};

export default ProductSpotlight;
