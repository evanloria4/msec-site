import { Router, Request, Response } from "express";
import Mailgun from "mailgun.js";
import FormData from "form-data";

export const contactRouter = Router();

type ContactRequestBody = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

function formatPhoneNumber(rawPhoneNumber: string): string {
  const digitsOnly = rawPhoneNumber.replace(/\D/g, "");

  if (digitsOnly.length !== 10) {
    return rawPhoneNumber; // fallback if unexpected format
  }

  const areaCode = digitsOnly.slice(0, 3);
  const prefix = digitsOnly.slice(3, 6);
  const lineNumber = digitsOnly.slice(6);

  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

async function sendContactEmail(params: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}) {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunFrom = process.env.MAILGUN_FROM;
  const mailgunTo = process.env.MAILGUN_TO;

  if (!mailgunApiKey || !mailgunDomain || !mailgunFrom || !mailgunTo) {
    throw new Error("Missing Mailgun environment variables");
  }
  const mailgun = new Mailgun(FormData);
  const mailgunClient = mailgun.client({
    username: "api",
    key: mailgunApiKey,
  });

  const emailSubject = `New Service Request: ${params.service}`;
  const emailBody =
    `New contact request received:\n\n` +
    `Name: ${params.name}\n` +
    `Email: ${params.email}\n` +
    `Phone: ${formatPhoneNumber(params.phone) || "Not provided"}\n` +
    `Service: ${params.service}\n\n` +
    `\n${params.message}`;

  await mailgunClient.messages.create(mailgunDomain, {
    from: mailgunFrom,
    to: [mailgunTo],
    subject: emailSubject,
    text: emailBody,
    "h:Reply-To": params.email,
  })
}

// POST req to /api/contact
contactRouter.post("/", async (request: Request, response: Response) => {
  try {
    const requestBody = request.body as ContactRequestBody;

    const name = (requestBody.name ?? "").trim();
    const phone = (requestBody.phone ?? "").trim();
    const email = (requestBody.email ?? "").trim();
    const service = (requestBody.service ?? "").trim();
    const message = (requestBody.message ?? "").trim();

    if (!name || !email || !service) {
      return response.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }

    await sendContactEmail({
      name,
      phone,
      email,
      service,
      message,
    });

    return response.status(200).json({
      ok: true,
      message: "Contact request sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return response.status(500).json({
      ok: false,
      error: "Failed to send contact request",
    });
  }
});
