// src/client/App.tsx
import React, { useMemo, useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import LocationsSection from "./components/LocationsSection";
import ContactSection from "./components/ContactSection";

type Service = {
  title: string;
  bullets: string[];
};

type Location = {
  name: string;
  note?: string;
};

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export default function App() {
  const services: Service[] = useMemo(
    () => [
      {
        title: "Electrical Contracting",
        bullets: ["New installs & upgrades", "Panels & circuits", "Lighting & controls"],
      },
      {
        title: "Mechanical Services",
        bullets: ["Equipment installs", "Retrofits", "Project support"],
      },
      {
        title: "Maintenance & Repair",
        bullets: ["Preventative maintenance", "Troubleshooting", "Responsive service"],
      },
    ],
    []
  );

  const locations: Location[] = useMemo(
    () => [
      { name: "Covington, LA", note: "Headquarters" },
      { name: "Hammond, LA" },
      { name: "Baton Rouge, LA" },
      { name: "Broussard, LA" },
      { name: "Shreveport, LA" },
      { name: "Gulfport, MS" },
    ],
    []
  );

  const [contactFormState, setContactFormState] = useState<ContactFormState>({
    name: "",
    phone: "",
    email: "",
    service: services[0]?.title ?? "Electrical Contracting",
    message: "",
  });

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleContactFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setContactFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  function handleContactFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    alert("Submitted (mock). We’ll wire this to the API later.");

    setContactFormState({
      name: "",
      phone: "",
      email: "",
      service: services[0]?.title ?? "Electrical Contracting",
      message: "",
    });
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header (kept in App) */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => scrollToSection("top")}
            aria-label="Back to top"
          >
            <div className="h-9 w-9 rounded-xl bg-slate-900" />
            <div>
              <div className="font-extrabold leading-tight">Mechanical Specialties LLC</div>
              <div className="text-xs text-slate-600">
                Electrical Contracting & Mechanical Services
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            <button
              className="rounded-lg px-3 py-2 font-semibold hover:bg-slate-100"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className="rounded-lg px-3 py-2 font-semibold hover:bg-slate-100"
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>
            <button
              className="rounded-lg px-3 py-2 font-semibold hover:bg-slate-100"
              onClick={() => scrollToSection("locations")}
            >
              Locations
            </button>
            <button
              className="rounded-lg bg-slate-900 px-3 py-2 font-bold text-white hover:opacity-95"
              onClick={() => scrollToSection("contact")}
            >
              Request a Quote
            </button>
          </nav>

          <a
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50"
            href="tel:+19851234567"
          >
            (985) 123-4567
          </a>
        </div>
      </header>

      <main id="top">
        <HeroSection onRequestQuote={() => scrollToSection("contact")} />
        <AboutSection />
        <ServicesSection services={services} />
        <LocationsSection locations={locations} />

        <ContactSection
          services={services}
          contactFormState={contactFormState}
          onFieldChange={handleContactFieldChange}
          onFormSubmit={handleContactFormSubmit}
        />

        {/* Footer (kept in App for now) */}
        <footer className="bg-slate-900 py-8 text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
            <div className="font-bold">© {new Date().getFullYear()} Mechanical Specialties LLC</div>
            <div className="text-sm text-white/80">Serving Louisiana & the Gulf Coast</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
