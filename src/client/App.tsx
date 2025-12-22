// src/client/App.tsx
import React, { useMemo, useState } from "react";
import axios from "axios";
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
    console.log("Form data:", contactFormState);
      axios.post("/api/contact", contactFormState).catch((error) => {
      console.error("Error submitting contact form:", error);
    })
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
      <header className="sticky top-0 z-50 bg-blue-950 text-white shadow border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo / Brand */}
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => scrollToSection("top")}
            aria-label="Back to top"
          >
            <div className="h-9 w-9 rounded-xl bg-white/15" />
            <div>
              <div className="font-extrabold leading-tight">
                Mechanical Specialties LLC
              </div>
              <div className="text-xs text-white/80">
                Electrical Contracting & Mechanical Services
              </div>
            </div>
          </button>

          {/* Phone number (plain text, top right) */}
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <span aria-hidden>📞</span>
            <span>(985) 249-5765</span>
          </div>
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
