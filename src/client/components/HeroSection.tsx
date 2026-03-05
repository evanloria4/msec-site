import React from 'react';
import { Link } from 'react-router-dom';
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

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Link
                to="/service-work"
                className="rounded-md bg-orange-500 px-4 py-2 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-orange-400"
              >
                Schedule Service
              </Link>
              <Link
                to="/new-construction"
                className="rounded-md border border-white/50 bg-white/10 px-4 py-2 text-[12px] font-extrabold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/20"
              >
                New Construction
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
