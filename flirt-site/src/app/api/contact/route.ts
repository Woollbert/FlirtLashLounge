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

export async function POST(request: Request) {
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
