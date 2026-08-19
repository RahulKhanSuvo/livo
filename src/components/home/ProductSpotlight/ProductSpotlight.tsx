import second from '@/assets/images/background.webp';
import Image from 'next/image';
import SpotProductTitle from './SpotTile';
import SpotDataGrid from './SpotDataGrid';

const ProductSpotlight = () => {
  return (
    <section className="relative h-[170vh] bg-[#f0efeb]">
      {/* Sticky Background */}
      <div className="sticky top-0 h-[calc(125vh)] z-10">
        <Image src={second} alt="background" fill priority className="object-cover" />
      </div>

      {/* Scrolling Content */}
      <div className="absolute inset-0 z-10">
        <section className="flex h-[calc(90vh)] items-start justify-center">
          <SpotProductTitle />
        </section>

        <section className="flex h-[calc(80vh)] items-center justify-center">
          <SpotDataGrid />
        </section>
      </div>
    </section>
  );
};

export default ProductSpotlight;
