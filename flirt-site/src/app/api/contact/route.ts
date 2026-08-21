import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

// SMTP is read at request time, not module scope, so adding the env vars in
// Vercel takes effect on the next request rather than needing a redeploy.
function getConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO || site.email,
    from: CONTACT_FROM || SMTP_USER,
  };
}

function clean(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

// Crude per-IP throttle. This endpoint sends mail on demand from an unauthed
// public form, and the honeypot alone only stops the laziest bots. Module
// scope means it resets whenever the serverless instance recycles and isn't
// shared between instances — it is a speed bump, not a guarantee. Anything
// stronger belongs in a WAF or Vercel's rate limiting, not here.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Too many requests. Please call us at ${site.phone}.` },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a bot filled the field no human can see. Return 200 so the bot
  // records a success and does not retry with a different strategy.
  if (clean(payload.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const phone = clean(payload.phone, 40);
  const service = clean(payload.service, 120);
  const artist = clean(payload.artist, 120);
  const preferred = clean(payload.preferred, 200);
  const message = clean(payload.message);

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Please include your name, phone, and email." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const config = getConfig();
  if (!config) {
    // Deliberately loud rather than a silent success: a booking request that
    // vanishes is worse than one that tells the guest to call.
    console.error(
      "[contact] SMTP is not configured — set SMTP_HOST / SMTP_USER / SMTP_PASS / CONTACT_TO. Request dropped:",
      { name, email, phone, service },
    );
    return NextResponse.json(
      {
        error: `Our form isn't connected yet — please call us at ${site.phone} and we'll get you booked.`,
      },
      { status: 503 },
    );
  }

  const lines = [
    `Name:      ${name}`,
    `Phone:     ${phone}`,
    `Email:     ${email}`,
    `Service:   ${service || "Not specified"}`,
    `Artist:    ${artist || "No preference"}`,
    `Preferred: ${preferred || "Not specified"}`,
    "",
    "Message:",
    message || "(none)",
  ].join("\n");

  try {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });

    await transport.sendMail({
      from: `"${site.shortName} website" <${config.from}>`,
      to: config.to,
      // So hitting reply in the inbox goes to the guest, not to the website.
      replyTo: `"${name}" <${email}>`,
      subject: `Booking request — ${name}${service ? ` — ${service}` : ""}`,
      text: lines,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: `We couldn't send that. Please call us at ${site.phone}.` },
      { status: 502 },
    );
  }
}
