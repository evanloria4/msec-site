import React, { useMemo } from 'react';
import HeroSection from '../components/HeroSection';
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
  lat: number;
  lng: number;
  labelDirection?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: [number, number];
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
      { name: 'Covington, LA', lat: 30.4735, lng: -90.1009 },
      { name: 'Hammond, LA', lat: 30.5044, lng: -90.4612 },
      { name: 'Denham Springs, LA', lat: 30.4882, lng: -90.9578, labelDirection: 'bottom', labelOffset: [0, 10] },
      { name: 'Walker, LA', lat: 30.4960, lng: -90.8625, labelDirection: 'top' },
      { name: 'Livingston, LA', lat: 30.5073, lng: -90.7540, labelDirection: 'right' },
      { name: 'Baton Rouge, LA', lat: 30.4515, lng: -91.1871 },
    ],
    []
  );
  return (
    <div id="top">
      <HeroSection />
      <ServicesSection services={services} />
      <LocationsSection locations={locations} />
      <ContactBanner />
    </div>
  );
}
