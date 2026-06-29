"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import ScrollReveal from "@/components/motion/ScrollReveal";

// Base URL of the FastAPI email service (set NEXT_PUBLIC_EMAIL_API in .env.local).
const EMAIL_API = process.env.NEXT_PUBLIC_EMAIL_API ?? "http://localhost:8000";

export default function ContactCTA({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const message = (formData.get("message") as string).trim();
    // Hidden honeypot — real users leave it empty; bots tend to fill it.
    const honeypot = ((formData.get("company") as string) ?? "").trim();

    if (!name || !email || !message) {
      setValidationError("Please fill in all fields.");
      return;
    }

    setIsSending(true);

    try {
      // The backend (CONTACT_TO) already delivers to the company inbox and sends
      // the visitor a confirmation, so a single request is all that's needed.
      const res = await fetch(`${EMAIL_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, honeypot }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Contact send failed:", err);
      setError(
        `Something went wrong. Please try again or email us directly at ${site.email}`,
      );
    } finally {
      setIsSending(false);
    }
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
                  Message sent! We&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-border bg-bg p-8"
              >
                {/* Honeypot: hidden from users; bot submissions are silently dropped. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
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
                {validationError ? (
                  <p className="text-sm text-red-600">{validationError}</p>
                ) : null}
                {error ? (
                  <p className="text-sm text-red-600">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSending ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
