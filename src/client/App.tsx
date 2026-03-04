// src/client/App.tsx
import React, { useMemo, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ServiceWork from './pages/ServiceWork';

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
          <Route path="/service-work" element={<ServiceWork />} />
        </Routes>
      </main>
      {/* Footer (kept in App for now) */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4">
          <div className="text-sm font-bold text-slate-900">
            © {new Date().getFullYear()} Mechanical Specialties LLC
          </div>
          <div className="text-sm text-slate-500">
            Serving Louisiana & the Gulf Coast
          </div>
        </div>
      </footer>
    </>
  );
}
