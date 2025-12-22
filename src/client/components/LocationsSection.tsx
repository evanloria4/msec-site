import React from "react";

type Location = {
  name: string;
  note?: string;
};

type LocationsSectionProps = {
  locations: Location[];
};

export default function LocationsSection({ locations }: LocationsSectionProps) {
  return (
    <section id="locations" className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Locations</h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <div className="flex h-64 items-center justify-center text-sm font-bold text-slate-500">
              MAP PLACEHOLDER
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-lg font-extrabold">Branch Operations</div>
            <div className="mt-3 space-y-2">
              {locations.map((location) => (
                <div key={location.name} className="rounded-xl border border-slate-200 px-3 py-2">
                  <div className="font-extrabold">{location.name}</div>
                  {location.note && <div className="text-xs text-slate-600">{location.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
