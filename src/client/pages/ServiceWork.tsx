import React, { useMemo, useState, useRef } from 'react';
import axios from 'axios';
import ContactSection from '../components/ContactSection';

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
  address: string;
  service: string;
  bestTimeToCall: string;
  preferredDate: string;
  message: string;
  photos: FileList | null;
  registerForUpdates: boolean;
};

type ToastType = 'success' | 'error';

export default function ServiceWork() {
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

  const [contactFormState, setContactFormState] = useState<ContactFormState>({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: services[0]?.title ?? 'Breaker Tripping Issues',
    bestTimeToCall: '',
    preferredDate: '',
    photos: null,
    message: '',
    registerForUpdates: false,
  });
  // State to manage contact form submission status
  const [isSending, setIsSending] = useState(false);
  // State to manage toast notifications
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);
  // Ref to store the toast timer ID for cleanup
  const toastTimer = useRef<number | null>(null);
  // Handle changes to contact form fields, including text inputs, checkboxes, and file uploads
  function handleContactFieldChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    // Grab the element that triggered the change event
    const target = event.target;
    // Check the type of input to handle checkboxes and file uploads differently since they don't use the value property in the same way as text inputs
    if (target instanceof HTMLInputElement) {
      if (target.type === 'checkbox') {
        console.log('Checkbox change detected:', target.name, target.checked);
        // Set the state for registerForUpdates to the checked status of the checkbox
        setContactFormState((prev) => ({
          ...prev,
          [target.name]: target.checked,
        }));
        return;
      }
      if (target.type === 'file') {
        console.log('File input change detected:', target.name, target.files);
        // Set the state for photos to the list of files selected by the user
        setContactFormState((prev) => ({
          ...prev,
          [target.name]: target.files,
        }));
        return;
      }
    }
    console.log('Input change detected:', target.name, target.value);
    setContactFormState((prev) => ({ ...prev, [target.name]: target.value }));
  }

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
        address: '',
        service: services[0]?.title ?? 'Breaker Tripping Issues',
        bestTimeToCall: '',
        preferredDate: '',
        photos: null,
        message: '',
        registerForUpdates: false,
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
    <ContactSection
      services={services}
      contactFormState={contactFormState}
      handleFieldChange={handleContactFieldChange}
      onFormSubmit={handleContactFormSubmit}
      toast={toast}
      onDismissToast={() => setToast(null)}
      isSending={isSending}
    />
  );
}
