import Link from 'next/link';
import { navCategories } from './navbar.data';

export const NavLinks = () => (
  <nav className="hidden lg:flex items-center space-x-7">
    {navCategories.map((category) => (
      <Link
        key={category.id}
        href={category.href}
        className="text-[12px] font-semibold tracking-wider uppercase text-neutral-800 hover:text-black py-2"
      >
        {category.title}
      </Link>
    ))}
  </nav>
);

export default NavLinks;
