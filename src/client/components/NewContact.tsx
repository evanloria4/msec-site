import React from 'react';
import PhotoThumbnail from './PhotoThumbnail';

type ToastType = 'success' | 'error';

type Service = {
  title: string;
  bullets: string[];
};

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  project: string;
  bestTimeToCall: string;
  preferredDate: string;
  message: string;
  photos: FileList | null;
  registerForUpdates: boolean;
};

type NewContactProps = {
  services: Service[];
  contactFormState: ContactFormState;
  handleFieldChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleRemovePhoto: (fileName: string) => void;
  onFormSubmit: (event: React.FormEvent) => void;

  toast: { type: ToastType; message: string } | null;
  onDismissToast: () => void;
  isSending: boolean;
};

export default function NewContact({
  services,
  contactFormState,
  handleFieldChange,
  handleRemovePhoto,
  onFormSubmit,
  toast,
  onDismissToast,
  isSending,
}: NewContactProps) {
  return (
    <>
      {toast && (
        <div className="fixed left-1/2 top-20 z-[999] -translate-x-1/2 sm:left-auto sm:right-4 sm:top-20 sm:translate-x-0">
          <div
            className={[
              'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg border border-white/30',
              toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500',
            ].join(' ')}
            role="status"
            aria-live="polite"
          >
            <span>{toast.message}</span>
            <button
              type="button"
              className="text-white/70 hover:text-white"
              onClick={onDismissToast}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section id="contact" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600">
              <span className="inline-block h-0.5 w-4 rounded bg-blue-600" />
              New Construction
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Start Your <span className="text-blue-600">Project</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Fill out the form and someone from our team will be in touch.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <form onSubmit={onFormSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Name
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="name"
                    value={contactFormState.name}
                    onChange={handleFieldChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Phone
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    type="tel"
                    name="phone"
                    value={contactFormState.phone}
                    onChange={handleFieldChange}
                    required
                    minLength={10}
                    maxLength={10}
                    autoComplete="tel"
                    placeholder="9852495765"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Email
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    type="email"
                    name="email"
                    value={contactFormState.email}
                    onChange={handleFieldChange}
                    required
                    placeholder="you@company.com"
                  />
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Street Address
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="street"
                    value={contactFormState.street}
                    onChange={handleFieldChange}
                    required
                    placeholder="123 Main St"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    City
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="city"
                    value={contactFormState.city}
                    onChange={handleFieldChange}
                    required
                    placeholder="Hammond"
                  />
                </div>

                {/* State */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    State
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="state"
                    value={contactFormState.state}
                    onChange={handleFieldChange}
                    required
                    placeholder="LA"
                    maxLength={2}
                  />
                </div>

                {/* ZIP */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    ZIP Code
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="zip"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={contactFormState.zip}
                    onChange={handleFieldChange}
                    required
                    placeholder="70401"
                    maxLength={5}
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Project Type
                  </label>
                  <select
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="project"
                    value={contactFormState.project}
                    onChange={handleFieldChange}
                  >
                    {services[1].bullets.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Best time to call */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Best Time to Call
                  </label>
                  <select
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="bestTimeToCall"
                    value={contactFormState.bestTimeToCall}
                    onChange={handleFieldChange}
                  >
                    <option value="" disabled>
                      Select a time window
                    </option>
                    <option value="Morning">Morning (8am–12pm)</option>
                    <option value="Afternoon">Afternoon (12pm–4pm)</option>
                    <option value="Anytime">Anytime</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Preferred Start Date
                  </label>
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    type="date"
                    name="preferredDate"
                    value={contactFormState.preferredDate}
                    min={
                      new Date(Date.now() + 86400000)
                        .toISOString()
                        .split('T')[0]
                    }
                    onChange={handleFieldChange}
                  />
                  <p className="text-xs text-slate-400">
                    We'll do our best to accommodate your preferred date — weekdays only. Dates are subject to availability and not guaranteed.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Description of Work
                </label>
                <textarea
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  name="message"
                  value={contactFormState.message}
                  onChange={handleFieldChange}
                  rows={5}
                  placeholder="Describe your project — scope, timeline, any specific requirements."
                />
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-slate-100" />

              {/* Photo upload */}
              <div className="flex items-center gap-3">
                <label className="cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600">
                  ↑ Attach Photos
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFieldChange}
                  />
                </label>
                <span className="text-xs text-slate-400">
                  PNG, JPG — up to 5 photos
                </span>
              </div>
              {/* Selected files preview */}
              {contactFormState.photos &&
                contactFormState.photos.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from(contactFormState.photos).map((file) => (
                      <PhotoThumbnail
                        key={file.name}
                        file={file}
                        onRemove={() => handleRemovePhoto(file.name)}
                      />
                    ))}
                  </div>
                )}
              {/* Checkbox */}
              <div className="mt-4">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="registerForUpdates"
                    checked={contactFormState.registerForUpdates}
                    onChange={handleFieldChange}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="font-semibold">
                    Register my home for future service updates
                  </span>
                </label>
              </div>
              {/* Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSending}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:-translate-y-px hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? 'Sending…' : 'Submit Project Request →'}
                </button>
                <p className="text-sm text-slate-400">
                  Prefer to talk?{' '}
                  <a
                    href="tel:+19852495765"
                    className="font-bold text-slate-800 underline decoration-slate-200 underline-offset-2 transition hover:text-blue-600 hover:decoration-blue-300"
                  >
                    (985) 249-5765
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
