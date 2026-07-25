import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { departmentData } from './data';

export const DepartmentGrid = () => {
  return (
    <section className="w-full py-12 px-4 bg-white">
      {/* Section Heading */}
      <h2 className="text-2xl  font-medium text-center text-gray-900 mb-10 tracking-tight">
        Shop by Department
      </h2>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 items-end">
        {departmentData.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center justify-end text-center space-y-4"
          >
            {/* Image Container with fixed height aspect area */}
            <div className="relative h-32 md:h-36 w-full flex items-center justify-center p-2">
              <Image
                src={item.icon}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                className="object-contain filter transition-opacity duration-200"
              />
            </div>

            {/* Title */}
            <span className="text-sm md:text-base font-normal text-gray-800 tracking-wide group-hover:text-black">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DepartmentGrid;
