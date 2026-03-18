// src/client/App.tsx
import React, { useMemo, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MsecLogo from './assets/logo.png';
import Home from './pages/Home';
import About from './pages/About';
import ServiceWork from './pages/ServiceWork';
import NewConstruction from './pages/NewConstruction';

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
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service-work" element={<ServiceWork />} />
          <Route path="new-construction" element={<NewConstruction />} />
        </Routes>
      </main>
      {/* Footer (kept in App for now) */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <img src={MsecLogo} alt="MSEC Logo" className="h-10 w-auto" />
            <div className="text-sm font-bold text-slate-900">
              © {new Date().getFullYear()} Mechanical Specialties LLC
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Serving Louisiana & the Gulf Coast
          </div>
        </div>
      </footer>
    </div>
  );
}
