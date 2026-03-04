import React from 'react';

export default function ContactBanner() {
  return (
    <section className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center">
        <div className="text-md font-semibold text-slate-600">Contact Us!</div>

        <div className="mt-2 flex items-center text-lg font-extrabold text-slate-900">
          <div className="flex-1 text-right">
            <a href="tel:+19852495765" className="hover:underline">
              (985) 249-5765
            </a>
          </div>

          <div className="px-6 text-slate-400">|</div>

          <div className="flex-1 text-left">
            <a href="mailto:msec@msec-usa.com" className="hover:underline">
              msec@msec-usa.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
