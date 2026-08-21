"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { team } from "@/data/misc";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full bg-ivory border border-line px-4 py-3.5 text-[0.95rem] text-espresso " +
  "placeholder:text-mute/60 focus:border-clay focus:outline-none transition-colors";

const LABEL =
  "block font-sans text-[0.62rem] uppercase tracking-wide2 text-mute mb-2";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(body.error || "Something went wrong.");

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please call us.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-line bg-sand/40 p-10 md:p-14 text-center">
        <p className="script-accent !text-[3.5rem] !text-clay">Thank you</p>
        <h3 className="display-md mt-4">Your request is in.</h3>
        <p className="lede mt-5 max-w-md mx-auto">
          We will get back to you within one business day to confirm a time. If it is
          urgent, calling the lounge is always faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-outline mt-8"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      {/* Honeypot. Real people never see it, so anything filled in here is a
          bot. Hidden with a wrapper rather than type="hidden" — many bots
          skip hidden inputs but happily fill a visible-in-the-DOM text field. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={LABEL} htmlFor="name">
            Name <span className="text-clay">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={FIELD}
            placeholder="First and last"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">
            Phone <span className="text-clay">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={FIELD}
            placeholder="(760) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="email">
          Email <span className="text-clay">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={LABEL} htmlFor="service">
            Service
          </label>
          <select id="service" name="service" className={FIELD} defaultValue="">
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="artist">
            Preferred artist
          </label>
          <select id="artist" name="artist" className={FIELD} defaultValue="">
            <option value="">No preference</option>
            {team.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="preferred">
          Preferred day or time
        </label>
        <input
          id="preferred"
          name="preferred"
          type="text"
          className={FIELD}
          placeholder="e.g. weekday mornings, or a specific date"
        />
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          Anything we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${FIELD} resize-y`}
          placeholder="New to extensions, sensitive eyes, event coming up, questions about pricing…"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[0.9rem] text-clay border border-clay/40 bg-clay/5 px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send request"}
        </button>
        <p className="text-[0.78rem] leading-relaxed text-mute max-w-xs">
          This is a request, not a confirmed booking — we will reply to lock in
          the time.
        </p>
      </div>
    </form>
  );
}
