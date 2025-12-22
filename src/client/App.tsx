import React, { useMemo, useState } from "react";

type Service = { title: string; bullets: string[] };
type Location = { name: string; note?: string };

const content = {
  brand: {
    name: "Mechanical Specialties LLC",
    tagline: "Electrical Contracting & Mechanical Services",
    phoneDisplay: "(985) 123-4567",
    phoneHref: "tel:+19851234567",
  },
  hero: {
    headline: "Electrical & Mechanical Services You Can Rely On",
    subheadline:
      "Based in Covington, Louisiana with branch operations across the region — serving residential and commercial clients since ~2013.",
    primaryCta: "Request a Quote",
    secondaryCta: "Call Now",
    trust: ["Licensed & Insured", "Residential + Commercial", "10+ Years Experience"],
  },
  about: {
    title: "About",
    paragraphs: [
      "Mechanical Specialties LLC is a trusted electrical contracting and mechanical services company based in Covington, Louisiana, with branch operations in Hammond, Baton Rouge, Broussard, Shreveport, and Gulfport, Mississippi.",
      "Serving both residential and commercial clients across multiple states, Mechanical Specialties has built a strong reputation for quality workmanship, reliable service, and responsive project delivery.",
    ],
  },
  servicesTitle: "Services",
  locationsTitle: "Locations",
  contact: {
    title: "Request a Quote",
    helper: "Tell us what you need and we’ll follow up quickly with next steps.",
  },
  footer: {
    line: "Serving Louisiana & the Gulf Coast",
  },
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

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: services[0]?.title ?? "Electrical Contracting",
    message: "",
  });

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onChange(
    element: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = element.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(element: React.FormEvent) {
    e.preventDefault();
    // Frontend-only for now.
    alert("Submitted (mock). We’ll wire this to the API later.");
    setForm({
      name: "",
      phone: "",
      email: "",
      service: services[0]?.title ?? "Electrical Contracting",
      message: "",
    });
  }
  return (
    <div>
      Hello World!
    </div>
  );
}
