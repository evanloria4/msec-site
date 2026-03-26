import React from 'react';
import ServiceAreaMap from './ServiceAreaMap';

type Location = {
  name: string;
  note?: string;
  lat: number;
  lng: number;
  labelDirection?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: [number, number];
};

type LocationsSectionProps = {
  locations: Location[];
};

export default function LocationsSection({ locations }: LocationsSectionProps) {
  return (
    <section
      id="locations"
      className="border-t border-slate-200 bg-slate-100 py-16"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span className="inline-block h-0.5 w-4 rounded bg-blue-600" />
            Coverage Area
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Proudly Serving{' '}
            <span className="text-blue-600">Southeast Louisiana</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Map */}
          <div className="flex flex-col md:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <ServiceAreaMap locations={locations} />
            </div>
            <p className="mt-2 px-1 text-xs text-slate-400">
              * Displayed service areas are approximate. Contact us to confirm availability in your area.
            </p>
          </div>

          {/* Locations list */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Areas We Cover
            </p>
            <div className="flex flex-col gap-2">
              {locations.map((location) => (
                <div
                  key={location.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="text-sm font-extrabold text-slate-900">
                    {location.name}
                  </div>
                  {location.note && (
                    <div className="mt-0.5 text-xs text-slate-500">
                      {location.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
