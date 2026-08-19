'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
        effect="cards"

        loop
      >
        {heroData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="relative h-[90vh]">
              <Image src={item.banner} alt={item.title} fill className="object-cover" priority />

              <div className="absolute bottom-24 left-8 text-white">
                <p className="uppercase tracking-[4px]">{item.subtitle}</p>

                <h1 className="my-4 text-7xl font-medium">{item.title}</h1>
                <div className="flex items-center gap-10">
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
