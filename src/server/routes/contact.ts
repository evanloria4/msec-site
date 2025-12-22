import { Router, Request, Response } from "express";

export const contactRouter = Router();

type ContactRequestBody = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

// Handle POST requests to /api/contact
contactRouter.post("/", async (request: Request, response: Response) => {
  const requestBody = request.body as ContactRequestBody;

  const name = (requestBody.name ?? "").trim();
  const phone = (requestBody.phone ?? "").trim();
  const email = (requestBody.email ?? "").trim();
  const service = (requestBody.service ?? "").trim();
  const message = (requestBody.message ?? "").trim();

  if (!name || !email || !service) {
    return response.status(400).json({
      ok: false,
      error: "Missing required fields: name, email, service",
    });
  }

  // TODO: send email here (nodemailer / sendgrid / postmark)
  console.log("New contact submission:", { name, phone, email, service, message });

  return response.status(200).json({ ok: true });
});
