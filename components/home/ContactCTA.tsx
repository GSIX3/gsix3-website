"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function ContactCTA({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className={`${compact ? "py-16" : "py-24 md:py-32"} bg-bg-elevated/40`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              {!compact && (
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Contact
                </p>
              )}
              <h2 className="font-heading text-3xl font-medium tracking-tight text-text md:text-4xl">
                {compact ? "Get in touch" : "Let's build something together"}
              </h2>
              <p className="mt-4 text-text-muted">
                Tell us about your project — web app, AI, data, cloud, or mobile.
                We&apos;ll get back to you within one business day.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block text-accent transition-colors hover:text-accent-bright"
              >
                {site.email}
              </a>
            </div>

            {submitted ? (
              <div className="flex items-center rounded-2xl border border-accent/30 bg-accent/5 p-8">
                <p className="font-heading text-xl text-text">
                  Message sent. We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-border bg-bg p-8"
              >
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm text-text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm text-text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm text-text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent/50"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-bright sm:w-auto"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
