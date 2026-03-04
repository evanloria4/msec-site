import React from 'react';

type Service = {
  title: string;
  bullets: string[];
};

type ServicesSectionProps = {
  services: Service[];
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="border-y border-slate-200 bg-slate-50 py-14"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-extrabold tracking-tight">
          Services
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-lg font-extrabold text-slate-900">
                {service.title}
              </div>

              <ul className="mt-4 space-y-2 pl-5 text-slate-700">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="list-disc">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
