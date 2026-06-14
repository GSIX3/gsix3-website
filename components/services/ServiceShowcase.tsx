"use client";

import { homeContent } from "@/content/home";
import { services } from "@/content/services";
import ServiceCard from "./ServiceCard";

export default function ServiceShowcase() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-text md:text-5xl">
            {homeContent.services.title}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
