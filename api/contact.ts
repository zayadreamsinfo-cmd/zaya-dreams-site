import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name = "",
      email = "",
      message = "",
      // optional honeypot field if you ever add it in the form:
      website = "",
    } = (req.body ?? {}) as Record<string, string>;

    // basic bot trap
    if (website) return res.status(200).json({ ok: true });

    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({ error: "Bitte Name, E-Mail und Nachricht ausfüllen." });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
    }

    const host = process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com";
    const port = Number(process.env.BREVO_SMTP_PORT || 587);
    const user = process.env.BREVO_SMTP_USER;
    const pass = process.env.BREVO_SMTP_PASS;

    const to = process.env.CONTACT_TO_EMAIL; // z.B. zaya.dreams.info@gmail.com
    const from = process.env.CONTACT_FROM_EMAIL; // z.B. zaya.dreams.info@gmail.com oder noreply@deinedomain

    if (!user || !pass || !to || !from) {
      return res.status(500).json({
        error:
          "Server nicht konfiguriert (ENV fehlt). Prüfe BREVO_SMTP_USER/PASS + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL.",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `ZAYA Dreams Kontaktformular: ${name}`;

    const text = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `ZAYA Dreams <${from}>`,
      to,
      replyTo: email, // damit du direkt auf den Absender antworten kannst
      subject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden." });
  }
}