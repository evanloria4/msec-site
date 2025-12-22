import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-extrabold tracking-tight">About</h2>

        <div className="mt-4 space-y-3 text-slate-700">
          <p className="max-w-4xl leading-7">
            Mechanical Specialties LLC is a trusted electrical contracting and mechanical services
            company based in Covington, Louisiana, with branch operations in Hammond, Baton Rouge,
            Broussard, Shreveport, and Gulfport, Mississippi.
          </p>
          <p className="max-w-4xl leading-7">
            Serving both residential and commercial clients across multiple states, Mechanical
            Specialties has built a strong reputation for quality workmanship, reliable service,
            and responsive project delivery.
          </p>
          <p className="max-w-4xl leading-7">
            The company has been serving the region since approximately 2013, bringing over a
            decade of experience to every job and fostering long-term relationships with
            homebuilders and business partners alike.
          </p>
        </div>
      </div>
    </section>
  );
}
