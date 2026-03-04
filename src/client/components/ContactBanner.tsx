import React from 'react';

export default function ContactBanner() {
  return (
    <section className="bg-blue-600 py-12">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200">
          <span className="inline-block h-0.5 w-4 rounded bg-blue-200" />
          Contact Our Team
          <span className="inline-block h-0.5 w-4 rounded bg-blue-200" />
        </p>

        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Ready to Schedule Your Service?
        </h2>
        <p className="mt-2 text-sm text-blue-200">
          Reach out by phone or email and we'll be in touch.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+19852495765"
            className="flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition hover:-translate-y-px hover:shadow-md"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l1.63-1.63a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
            </svg>
            (985) 249-5765
          </a>

          <a
            href="mailto:msec@msec-usa.com"
            className="flex items-center gap-2.5 rounded-xl border border-blue-400 bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-px hover:bg-blue-800 hover:shadow-md"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            msec@msec-usa.com
          </a>
        </div>
      </div>
    </section>
  );
}
