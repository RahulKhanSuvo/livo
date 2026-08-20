'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { heroData } from './data';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
const HeroSection = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
          bulletClass:
            'inline-block size-[8px] bg-neutral-300 rounded-full cursor-pointer transition-all mx-1',
          bulletActiveClass: '!bg-neutral-800',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="slide"
        loop
      >
        {heroData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="relative h-[70vh] w-full sm:h-[80vh] lg:h-[90vh]">
              <Image src={item.banner} alt={item.title} fill className="object-cover" priority />

              {/* Legibility scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-16 px-5 text-white sm:bottom-24 sm:left-8 sm:right-auto sm:max-w-xl sm:px-0">
                <p className="text-[11px] uppercase tracking-[3px] sm:tracking-[4px]">
                  {item.subtitle}
                </p>

                <h1 className="my-3 text-4xl font-medium leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {item.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-10">
                  {item.cts.map((btn, index) => (
                    <Button asChild className={'px-0'} variant={'editorial-link'} key={index}>
                      <Link href={btn.href}>{btn.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-pagination mt-6 flex justify-center " />
    </div>
  );
};
export default HeroSection;
