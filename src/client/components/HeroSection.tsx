import React from 'react';

type Props = {
  onRequestQuote: () => void;
};

export default function HeroSection({ onRequestQuote }: Props) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-slate-900/5 to-transparent">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 md:grid-cols-[1.35fr_0.65fr]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Electrical & Mechanical Services You Can Rely On
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Trusted electrical contracting and mechanical services based in Covington, Louisiana
            with branch operations in Hammond, Baton Rouge, Broussard, Shreveport, and Gulfport,
            Mississippi. Serving residential and commercial clients since approximately 2013.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="rounded-xl bg-slate-900 px-4 py-3 font-extrabold text-white hover:opacity-95"
              onClick={onRequestQuote}
            >
              Request a Quote
            </button>
            <a
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-extrabold text-slate-900 hover:bg-slate-50"
              href="tel:+19851234567"
            >
              Call Now
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              Licensed & Insured
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              Residential + Commercial
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              10+ Years Experience
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-lg font-extrabold">
            Fast Response. Clean Work. Clear Communication.
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tell us what you need and we’ll follow up quickly with next steps.
          </p>

          <button
            className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 font-extrabold text-white hover:opacity-95"
            onClick={onRequestQuote}
          >
            Start a Request
          </button>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <div className="flex h-36 items-center justify-center bg-slate-50 text-sm font-bold text-slate-500">
              HERO IMAGE PLACEHOLDER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}