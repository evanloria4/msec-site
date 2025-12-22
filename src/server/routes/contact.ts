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
  turnstileToken?: string;
};

// -------- HELPERS --------

function getClientIpAddress(request: Request): string | undefined {
  const forwardedForHeaderValue = request.headers["x-forwarded-for"];
  if (typeof forwardedForHeaderValue === "string" && forwardedForHeaderValue.length > 0) {
    return forwardedForHeaderValue.split(",")[0]?.trim();
  }
  return request.socket.remoteAddress ?? undefined;
}

async function verifyTurnstileToken(params: {
  token: string;
  clientIpAddress?: string;
}): Promise<{ isValid: boolean; errorCodes?: unknown }> {
  const turnstileSecretKey = process.env.TURNSTILE_SECRET;
  if (!turnstileSecretKey) {
    return { isValid: false, errorCodes: ["turnstile_secret_missing"] };
  }

  const requestBody = new URLSearchParams();
  requestBody.append("secret", turnstileSecretKey);
  requestBody.append("response", params.token);
  if (params.clientIpAddress) {
    requestBody.append("remoteip", params.clientIpAddress);
  }

  // IMPORTANT: no trailing slash
  const verificationResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: requestBody.toString(),
    }
  );

  const verificationJson = (await verificationResponse.json()) as {
    success?: boolean;
    ["error-codes"]?: unknown;
  };

  return {
    isValid: Boolean(verificationJson.success),
    errorCodes: verificationJson["error-codes"],
  };
}

async function sendContactEmailWithMailgun(params: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}): Promise<void> {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const emailFromAddress = process.env.MAILGUN_FROM;
  const emailToAddress = process.env.MAILGUN_TO;

  if (!mailgunApiKey || !mailgunDomain || !emailFromAddress || !emailToAddress) {
    throw new Error("Missing Mailgun env vars");
  }

  const mailgunClient = new Mailgun(FormData).client({
    username: "api",
    key: mailgunApiKey,
  });

  const emailSubject = `New Quote Request: ${params.service}`;
  const emailBodyText =
    `New contact request\n\n` +
    `Name: ${params.name}\n` +
    `Email: ${params.email}\n` +
    `Phone: ${params.phone}\n` +
    `Service: ${params.service}\n\n` +
    `Message:\n${params.message}\n`;

  await mailgunClient.messages.create(mailgunDomain, {
    from: emailFromAddress,
    to: [emailToAddress],
    subject: emailSubject,
    text: emailBodyText,
    "h:Reply-To": params.email,
  });
}

// Handle POST requests to /api/contact
contactRouter.post("/", async (request: Request, response: Response) => {
  try {
    const requestBody = request.body as ContactRequestBody;

    const name = (requestBody.name ?? "").trim();
    const phone = (requestBody.phone ?? "").trim();
    const email = (requestBody.email ?? "").trim();
    const service = (requestBody.service ?? "").trim();
    const message = (requestBody.message ?? "").trim();
    const turnstileToken = (requestBody.turnstileToken ?? "").trim();

    if (!name || !email || !service) {
      return response.status(400).json({ ok: false, error: "Missing required fields" });
    }

    if (!turnstileToken) {
      return response.status(400).json({ ok: false, error: "Missing Turnstile token" });
    }

    const clientIpAddress = getClientIpAddress(request);

    const tokenVerification = await verifyTurnstileToken({
      token: turnstileToken,
      clientIpAddress,
    });

    if (!tokenVerification.isValid) {
      return response.status(400).json({
        ok: false,
        error: "Turnstile verification failed",
        details: tokenVerification.errorCodes,
      });
    }

    await sendContactEmailWithMailgun({ name, phone, email, service, message });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return response.status(500).json({ ok: false, error: "Server error" });
  }
});
