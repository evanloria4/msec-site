import React from 'react';
import { Link } from 'react-router-dom';

type Service = {
  title: string;
  bullets: string[];
};

type ServicesSectionProps = {
  services: Service[];
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            <span className="inline-block h-0.5 w-4 rounded bg-blue-600" />
            What We Do
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Our <span className="text-blue-600">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  {service.title === 'Service Work' ? '🔧' : '🏠'}
                </span>
                <div className="text-base font-extrabold text-slate-900">
                  {service.title}
                </div>
              </div>

              <ul className="grow space-y-2">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="-mt-0.5 text-blue-500 font-bold">—</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex justify-end">
                <Link
                  to={service.title === 'Service Work' ? '/service-work' : '/new-construction'}
                  className="rounded-md bg-orange-500 px-4 py-2 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-orange-400"
                >
                  {service.title === 'Service Work' ? 'Request Service' : 'New Construction'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
