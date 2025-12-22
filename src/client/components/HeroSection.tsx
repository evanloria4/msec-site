import React from 'react';
import heroBackgroundImageUrl from '../assets/hero.jpg';

type HeroSectionProps = {
  onRequestQuote: () => void;
};

export default function HeroSection({ onRequestQuote }: HeroSectionProps) {
  console.log(heroBackgroundImageUrl)
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="h-[160px] w-full bg-cover bg-center sm:h-[190px] md:h-[220px]"
        style={{ backgroundImage: `url(${heroBackgroundImageUrl})` }}
        aria-label="Hero background"
      />

      {/* Dark overlay (left-heavy like your screenshot) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="max-w-[420px]">
            <h1 className="text-[20px] font-extrabold leading-tight text-white sm:text-[22px] md:text-[26px]">
              Electrical &amp; Mechanical Services
              <br />
              You Can Rely On
            </h1>

            <p className="mt-2 text-[11px] font-semibold text-white/80 sm:text-[12px]">
              Trusted Across Louisiana &amp; Gulf Coast Since 2013.
            </p>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={onRequestQuote}
                className="rounded-md bg-orange-500 px-4 py-2 text-[12px] font-extrabold text-white shadow-sm hover:bg-orange-400"
              >
                Request Service
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
