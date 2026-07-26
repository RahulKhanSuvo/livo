import second from '@/assets/images/background.webp';
import Image from 'next/image';

const ProductSpotlight = () => {
  return (
    <section className="relative h-[200vh]">
      {/* Sticky Background */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] -z-10">
        <Image src={second} alt="background" fill priority className="object-cover" />
      </div>

      {/* Scrolling Content */}
      <div className="absolute inset-0 z-10">
        <section className="flex h-screen items-center justify-center">
          <h2 className="text-5xl text-white">First Content</h2>
        </section>

        <section className="flex h-screen items-center justify-center">
          <h2 className="text-5xl text-white">Second Content</h2>
        </section>
      </div>
    </section>
  );
};

export default ProductSpotlight;
