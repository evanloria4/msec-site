import React from 'react';

export default function ContactBanner() {
  return (
    <section className="bg-blue-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 md:flex-row">
        <div className="text-sm font-semibold md:text-base">
          Need service? Contact us today.
        </div>

        <div className="flex flex-col items-center gap-2 text-sm font-bold md:flex-row md:gap-6 md:text-base">
          <a href="tel:+19852495765" className="hover:underline">
            📞 (985) 249-5765
          </a>

          <a href="mailto:msec@msec-usa.com" className="hover:underline">
            ✉️ msec@msec-usa.com
          </a>
        </div>
      </div>
    </section>
  );
}
