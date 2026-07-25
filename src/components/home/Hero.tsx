'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { heroData } from './data';
import Image from 'next/image';
const HeroSection = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
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

              <div className="absolute bottom-24 left-20 text-white">
                <p className="uppercase tracking-[4px]">{item.subtitle}</p>

                <h1 className="mt-4 text-7xl font-light">{item.title}</h1>

                <button className="mt-6 underline">Shop Lighting</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-pagination mt-6 flex justify-center" />
    </div>
  );
};
export default HeroSection;
