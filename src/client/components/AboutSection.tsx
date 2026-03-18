import React from 'react';
import MsecLogo from '../assets/logo.png';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-slate-200 bg-slate-100 py-24"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Left: text */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600">
              <span className="inline-block h-0.5 w-4 rounded bg-blue-600" />
              Who We Are
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Serving Southeast <span className="text-blue-600">Louisiana</span>{' '}
              for Over 25 Years
            </h2>

            <div className="mt-6 space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Mechanical Specialties LLC (MSEC) is a trusted electrical
                contractor based in Hammond, Louisiana, proudly serving
                Southeast Louisiana from Covington to Baton Rouge, including
                Mandeville, Hammond, Ponchatoula and Livingston Parish.
              </p>
              <p>
                For over 25 years, MSEC has built a strong reputation rooted in
                reliability, professionalism, and customer satisfaction. We
                provide electrical services for both residential and commercial
                clients, delivering consistent results and dependable
                workmanship on every project.
              </p>
              <p>
                With more than a decade of hands-on field experience applied to
                every job, our team understands what it takes to execute work
                efficiently, safely, and to code — from service calls and system
                upgrades to new construction and major installations.
              </p>
              <p>
                Our commitment is simple: honest communication, quality
                craftsmanship, and electrical solutions built to last.
              </p>
            </div>
          </div>

          {/* Right: logo + photo placeholder */}
          <div>
            <div className="mb-4 flex justify-center">
              <img src={MsecLogo} alt="MSEC Logo" className="h-32 w-auto" />
            </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="aspect-[16/10] w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1.5">
              <div className="text-sm font-bold text-slate-700">
                Project Photos
              </div>
              <div className="text-xs text-slate-400">
                Slideshow coming soon
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl border border-dashed border-slate-300 bg-slate-50"
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
