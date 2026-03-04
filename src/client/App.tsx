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

type ToastType = 'success' | 'error';

export default function App() {
  const services = useMemo(
    () => [{ title: 'Service Work' }, { title: 'New Construction' }],
    []
  );
  // State to manage toast notifications
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);
  // Ref to store the toast timer ID for cleanup
  const toastTimer = useRef<number | null>(null);
  // State to manage contact form submission status
  const [isSending, setIsSending] = useState(false);
  /* Function to show toast notifications
   * I: type of toast (success or error), message to display
   * O: Displays a toast notification and automatically dismisses it after 4 seconds
   * C: None
   * E: If a toast is already being displayed, it will clear the existing timer before showing the new toast to prevent multiple toasts from stacking or lingering longer than intended
   */
  function showToast(type: ToastType, message: string) {
    // Set the toast state to display the notification
    setToast({ type, message });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4000);
  }

  // Set state for turnstile token and contact form
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [contactFormState, setContactFormState] = useState<ContactFormState>({
    name: '',
    phone: '',
    email: '',
    service: services[0]?.title ?? 'Electrical Contracting',
    message: '',
  });

  function scrollToSection(sectionId: string) {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleContactFieldChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    setContactFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  async function handleContactFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSending) return;

    setIsSending(true);
    try {
      // Submit the form data to the backend API
      await axios.post('/api/contact', contactFormState);
      // Show success toast and reset form
      showToast('success', 'Thanks! Your request was submitted.');
      // Empty the form and reset to default service
      setContactFormState({
        name: '',
        phone: '',
        email: '',
        service: services[0]?.title ?? 'Electrical Contracting',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Show error toast
      showToast('error', 'Sorry — something went wrong. Please try again.');
    } finally {
      // Re-enable the form
      setIsSending(false);
    }
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
