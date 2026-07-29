import { Container } from '@/components/shared/Container';
import Image from 'next/image';
const GetInspiredBanner = () => {
  return (
    <section className=" text-gray-900 w-full ">
      <Container size="lg">
        <div className="grid bg-[#E5E4DF] grid-cols-1 lg:grid-cols-12 gap-8 items-center px-11">
          {/* Left Side: Typography & CTA */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-6">
            <h2 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-black">
              Get inspired
            </h2>
            <p className="text-sm sm:text-base text-gray-700 max-w-sm leading-relaxed">
              So many styles and colors! Browse our lookbook and get inspired for your dream home.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="inline-block bg-white text-black font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Check now
              </button>
            </div>
          </div>

          {/* Right Side: Overlapping Images Layout */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative">
            {/* Vertical Dining Room Image (Overlaid on top left) */}
            <div className="sm:col-span-5 z-10 shadow-lg relative sm:-mr-8 my-auto">
              <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-200">
                <Image
                  src={
                    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800'
                  }
                  alt="Modern interior dining setup"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 30vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Horizontal Decorative Lamps Image (Base background right) */}
            <div className="sm:col-span-7 z-0">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                <Image
                  src={
                    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000'
                  }
                  alt="Modern lighting fixtures"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetInspiredBanner;
