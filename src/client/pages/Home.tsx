import React, { useMemo, useRef, useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import LocationsSection from '../components/LocationsSection';
import ContactBanner from '../components/ContactBanner';

type Service = {
  title: string;
  bullets: string[];
};

type Location = {
  name: string;
  note?: string;
};

export default function Home() {
  const services: Service[] = useMemo(
    () => [
      {
        title: 'Service Work',
        bullets: [
          'Breaker Tripping Issues',
          'Panel Troubleshooting',
          'Panel Upgrades',
          'Remodel Wiring',
          'Changing Lights',
          'Ceiling Fan Installations',
          'Switch & Receptacle Replacement',
          'New Circuits and Additions',
          'Existing System Modifications',
        ],
      },
      {
        title: 'New Construction',
        bullets: [
          'Full Home Wiring',
          'EV Charger Installations',
          'Full Home Generators',
          'Patio Expansions',
          'Soffit Lighting',
          'Soffit Receptacles',
          'Additional Lighting Installations',
          'Outdoor Power Installations',
          'Dedicated Appliance Circuits',
        ],
      },
    ],
    []
  );
  const locations: Location[] = useMemo(
    () => [
      { name: 'Covington, LA' },
      { name: 'Hammond, LA' },
      { name: 'Denham Springs, LA' },
      { name: 'Walker, LA' },
      { name: 'Livingston, LA' },
      { name: 'Baton Rouge, LA' },
    ],
    []
  );
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main id="top">
        <HeroSection />
        <AboutSection />
        <ServicesSection services={services} />
        <LocationsSection locations={locations} />

        {/* <ContactSection
          services={services}
          contactFormState={contactFormState}
          turnstileToken={turnstileToken}
          onTurnstileTokenChange={setTurnstileToken}
          onFieldChange={handleContactFieldChange}
          onFormSubmit={handleContactFormSubmit}
          toast={toast}
          onDismissToast={() => setToast(null)}
          isSending={isSending}
        /> */}
      </main>
    </div>
  );
}
