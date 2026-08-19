'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { footerCategories, footerServices, footerInformation } from './footer.data';
import brandLogo from '@/assets/icons/logo1.svg';
import Image from 'next/image';
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log({ email, agreed });
  };

  return (
    <footer className="w-full bg-[#f3f2ef] pt-16 overflow-hidden">
      <Container>
        {/* Top 4-Column Navigation & Newsletter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16">
          {/* Column 1: Popular Category */}
          <div className="lg:col-span-3">
            <h4 className="text-2xl font-medium text-neutral-900 mb-4 sm:mb-6">Popular category</h4>
            <ul className="space-y-2.5">
              {footerCategories.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className=" text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Service */}
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-medium text-neutral-900 mb-4 sm:mb-6">Service</h4>
            <ul className="space-y-2.5">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className=" text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="lg:col-span-3">
            <h4 className="text-2xl font-medium text-neutral-900 mb-4 sm:mb-6">Information</h4>
            <ul className="space-y-2.5">
              {footerInformation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className=" text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h4 className="text-2xl font-medium text-neutral-900 mb-2">
              Sign up to our Newsletter
            </h4>
            <p className="text-xs text-neutral-600 font-light leading-relaxed mb-6 max-w-sm">
              Be the first to know the least relases, news, collaborations, exclusives and offers!
            </p>

            {/* Email Input Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex items-center rounded-full bg-white p-1 pl-4 border border-neutral-200 focus-within:border-neutral-900 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  suppressHydrationWarning
                  className="w-full bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[#3d3a37] px-5 py-2.5 text-xs font-normal text-white hover:bg-neutral-900 transition-colors"
                >
                  Subscribe
                </button>
              </div>

              {/* Checkbox agreement */}
              <label className="mt-3 flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-800"
                />
                <span className="text-[11px] text-neutral-600 font-light">
                  I want to sign up for the Newsletter.
                </span>
              </label>
            </form>
          </div>
        </div>

        {/* Bottom Giant Brand Wordmark */}
        <div className="w-full text-center pt-8 pb-0 overflow-hidden select-none">
          <Image src={brandLogo} alt="LIVO" className="w-full" />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
