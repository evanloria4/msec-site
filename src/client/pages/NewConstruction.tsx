import React, { useMemo, useState, useRef } from 'react';
import axios from 'axios';

import NewContact from '../components/NewContact';

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

type ToastType = 'success' | 'error';

export default function NewConstruction() {
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
    street: '',
    city: '',
    state: '',
    zip: '',
    project: services[1]?.title ?? 'Full Home Wiring',
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
        // Set the state for registerForUpdates to the checked status of the checkbox
        setContactFormState((prev) => ({
          ...prev,
          [target.name]: target.checked,
        }));
        return;
      }
      if (target.type === 'file') {
        // Grab the new filesfrom the input
        const newFiles = target.files ? Array.from(target.files) : [];
        // Grab the current files from state
        const existingFiles = contactFormState.photos
          ? Array.from(contactFormState.photos)
          : [];
        // Merge newFiles with existingFiles
        const merged = [...existingFiles, ...newFiles];

        // Convert back to a DataTransfer FileList
        const dt = new DataTransfer();
        merged.forEach((file) => dt.items.add(file));

        setContactFormState((prev) => ({ ...prev, [target.name]: dt.files }));
        return;
      }
    }
    setContactFormState((prev) => ({ ...prev, [target.name]: target.value }));
  }

  // Remove file from photos list in state by index
  function handleRemovePhoto(fileName: string) {
    // Create an array of the existing files in state
    const existing = contactFormState.photos
      ? Array.from(contactFormState.photos)
      : [];
    // Remove the file with the matching name from the array
    const filtered = existing.filter((file) => file.name !== fileName);

    const dt = new DataTransfer();
    filtered.forEach((file) => dt.items.add(file));
    setContactFormState((prev) => ({ ...prev, photos: dt.files }));
    // Also clear the file input value to allow re-uploading the same file if desired
    const fileInput = document.querySelector<HTMLInputElement>(
      'input[name="photos"]'
    );
    // If the file input exists, clear its value to reset the file selection (this allows users to re-upload the same file if they want after removing it)
    if (fileInput) fileInput.value = '';
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
    const formData = new FormData();
    formData.append('name', contactFormState.name);
    formData.append('phone', contactFormState.phone);
    formData.append('email', contactFormState.email);
    formData.append('street', contactFormState.street);
    formData.append('city', contactFormState.city);
    formData.append('state', contactFormState.state);
    formData.append('zip', contactFormState.zip);
    formData.append('project', contactFormState.project);
    formData.append('bestTimeToCall', contactFormState.bestTimeToCall);
    formData.append('preferredDate', contactFormState.preferredDate);
    formData.append('message', contactFormState.message);
    formData.append(
      'registerForUpdates',
      String(contactFormState.registerForUpdates)
    );
    try {
      if (contactFormState.photos) {
        Array.from(contactFormState.photos).forEach((file) => {
          formData.append('photos', file);
        });
      }
      // Submit the form data to the backend API
      await axios.post('/api/contact/new-construction', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Show success toast and reset form
      showToast('success', 'Thanks! Your request was submitted.');
      // Empty the form and reset to default service
      setContactFormState({
        name: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        project: services[1]?.title ?? 'Full Home Wiring',
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
    <NewContact
      services={services}
      contactFormState={contactFormState}
      handleFieldChange={handleContactFieldChange}
      handleRemovePhoto={handleRemovePhoto}
      onFormSubmit={handleContactFormSubmit}
      toast={toast}
      onDismissToast={() => setToast(null)}
      isSending={isSending}
    />
  );
}
