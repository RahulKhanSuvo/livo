import React from 'react';
import { editorialBanners } from './data';
import { Container } from '../shared/Container';
import BannerCard from './BannerCard';

export const EditorialGrid = () => {
  const featuredItem = editorialBanners.find((item) => item.isFeatured);
  const secondaryItems = editorialBanners.filter((item) => !item.isFeatured);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 md:gap-2 h-auto lg:h-155">
        {/* Large Featured Card (Left Side / Top on Mobile) */}
        {featuredItem && (
          <div className="md:col-span-2 lg:col-span-8 h-95 sm:h-112.5 md:h-125 lg:h-full">
            <BannerCard item={featuredItem} isFeatured />
          </div>
        )}

        {/* Secondary Cards Stacked */}
        <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  h-auto lg:h-full gap-2 ">
          {secondaryItems.map((item) => (
            <div key={item.id} className="h-auto">
              <BannerCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EditorialGrid;
