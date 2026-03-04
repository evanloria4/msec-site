import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="border-y border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* Left: text */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Mechanical Specialties Electrical Contractor
            </h2>

            <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
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
                efficiently, safely, and to code. From service calls and system
                upgrades to new construction and major installations, we
                approach every project with the same level of precision and
                accountability.
              </p>

              <p>
                MSEC has developed long-term working relationships with
                homeowners, builders, and business partners across the region.
                Our commitment is simple: provide honest communication, quality
                craftsmanship, and electrical solutions that are built to last.
              </p>
            </div>
          </div>

          {/* Right: future slideshow / photos */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="aspect-[16/10] w-full rounded-2xl border border-slate-200 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-extrabold text-slate-700">
                  Project Photos
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Slideshow coming soon
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-white" />
              <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-white" />
              <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
