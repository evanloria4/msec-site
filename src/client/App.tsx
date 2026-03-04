// src/client/App.tsx
import React, { useMemo, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ContactBanner from './components/ContactBanner';
import Home from './pages/Home';
import About from './pages/About';

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export default function App() {
  // Set state for turnstile token and contact form
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  function scrollToSection(sectionId: string) {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <ContactBanner />
      {/* Footer (kept in App for now) */}
      <footer className="bg-slate-900 py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
          <div className="font-bold">
            © {new Date().getFullYear()} Mechanical Specialties LLC
          </div>
          <div className="text-sm text-white/80">
            Serving Louisiana & the Gulf Coast
          </div>
        </div>
      </footer>
    </>
  );
}
