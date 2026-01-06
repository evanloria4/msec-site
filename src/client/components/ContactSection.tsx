import React from "react";
import TurnstileWidget from "./TurnstileWidget";

type ToastType = "success" | "error";

type Service = {
  title: string;
  bullets: string[];
};

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type ContactSectionProps = {
  services: Service[];
  contactFormState: ContactFormState;
  turnstileToken: string;
  onTurnstileTokenChange: (token: string) => void;
  onFieldChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onFormSubmit: (event: React.FormEvent) => void;

  toast: { type: ToastType; message: string } | null;
  onDismissToast: () => void;
  isSending: boolean;
};


export default function ContactSection({
  services,
  contactFormState,
  turnstileToken,
  onTurnstileTokenChange,
  onFieldChange,
  onFormSubmit,
  toast,
  onDismissToast,
  isSending,
}: ContactSectionProps) {

  return (
    <>
      {toast && (
        <div className="fixed right-4 top-16 md:top-24 z-[999]">
          <div
            className={[
              "w-[min(92vw,420px)] rounded-xl px-4 py-3 shadow-lg border",
              toast.type === "success"
                ? "bg-emerald-600 text-white border-white/20"
                : "bg-red-600 text-white border-white/20",
            ].join(" ")}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold">{toast.message}</div>
              <button
                type="button"
                className="text-white/90 hover:text-white"
                onClick={onDismissToast}
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="contact" className="border-y border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Request Service
          </h2>

          <form
            onSubmit={onFormSubmit}
            className="mt-5 max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold text-slate-700">
                  Name
                </label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-slate-900"
                  name="name"
                  value={contactFormState.name}
                  onChange={onFieldChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700">
                  Phone
                </label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-slate-900"
                  type="tel"
                  name="phone"
                  value={contactFormState.phone}
                  onChange={onFieldChange}
                  required
                  minLength={10}
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="9852495765"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700">
                  Email
                </label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-slate-900"
                  type="email"
                  name="email"
                  value={contactFormState.email}
                  onChange={onFieldChange}
                  required
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700">
                  Service Needed
                </label>
                <select
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-slate-900"
                  name="service"
                  value={contactFormState.service}
                  onChange={onFieldChange}
                >
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-extrabold text-slate-700">
                Message
              </label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-slate-900"
                name="message"
                value={contactFormState.message}
                onChange={onFieldChange}
                rows={5}
                placeholder="Tell us about the project..."
              />
            </div>

            <div className="mt-4">
              <TurnstileWidget
                siteKey="YOUR_TURNSTILE_SITE_KEY"
                onTokenChange={onTurnstileTokenChange}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSending}
                className="rounded-xl px-4 py-3 font-extrabold text-white bg-slate-900 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Send Request"}
              </button>

              <div className="text-sm text-slate-600">
                Or call{" "}
                <a
                  className="font-extrabold text-slate-900"
                  href="tel:+198512495765"
                >
                  (985) 249-5765
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>

  );
}
