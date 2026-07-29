'use client';

import Link from 'next/link';
import { navCategories } from './navbar.data';

export const DiningRoomContent = () => {
  const diningCategory = navCategories.find((cat) => cat.id === 'dining');

  if (!diningCategory || !diningCategory.columns) return null;

  return (
    <div className="py-6 flex flex-col space-y-4">
      {diningCategory.columns.map((col, idx) => (
        <div key={idx} className="space-y-2">
          {col.header && (
            <h3 className="text-xs font-semibold uppercase text-neutral-900">{col.header}</h3>
          )}
          <ul className="space-y-1">
            {col.items.map((item, iIdx) => (
              <li key={iIdx}>
                <Link href={item.href} className="text-sm text-neutral-700 hover:text-black">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DiningRoomContent;
