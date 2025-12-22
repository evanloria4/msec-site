import React from "react";

type Service = {
  title: string;
  bullets: string[];
};

type ServicesSectionProps = {
  services: Service[];
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="border-y border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Services</h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="text-lg font-extrabold">{service.title}</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
