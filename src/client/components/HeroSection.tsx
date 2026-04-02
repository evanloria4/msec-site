import React from 'react';
import heroBackgroundImageUrl from '../assets/hero.jpg';

type HeroSectionProps = {};

export default function HeroSection({}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="h-[240px] w-full bg-cover bg-center sm:h-[280px] md:h-[340px]"
        style={{ backgroundImage: `url(${heroBackgroundImageUrl})` }}
        aria-label="Hero background"
      />

      {/* Dark overlay  */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="max-w-[420px]">
            <h1 className="text-[20px] font-extrabold leading-tight text-white sm:text-[22px] md:text-[26px]">
              Reliable Electrical Service From Covington to Baton Rouge
            </h1>

            <p className="mt-2 text-[11px] font-semibold text-white/80 sm:text-[12px]">
              Residential & Commercial Electrical Contractor |
              <br />
              25+ Years Serving Southeast Louisiana
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
