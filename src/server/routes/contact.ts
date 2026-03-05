import { Router, Request, Response } from 'express';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import multer from 'multer';

export const contactRouter = Router();

type ContactRequestBody = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  service?: string;
  bestTimeToCall?: string;
  preferredDate?: string;
  message?: string;
  registerForUpdates: string;
  photos: Express.Multer.File[];
};

function formatPhoneNumber(rawPhoneNumber: string): string {
  const digitsOnly = rawPhoneNumber.replace(/\D/g, '');

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
  street: string;
  city: string;
  state: string;
  zip: string;
  service?: string;
  bestTimeToCall?: string;
  preferredDate?: string;
  message?: string;
  registerForUpdates: string;
  photos: Express.Multer.File[];
}) {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunFrom = process.env.MAILGUN_FROM;
  const mailgunTo = process.env.MAILGUN_TO;

  if (!mailgunApiKey || !mailgunDomain || !mailgunFrom || !mailgunTo) {
    throw new Error('Missing Mailgun environment variables');
  }
  const mailgun = new Mailgun(FormData);
  const mailgunClient = mailgun.client({
    username: 'api',
    key: mailgunApiKey,
  });

  const emailSubject = `New Service Request: ${params.service}`;
  const address = `${params.street}, ${params.city}, ${params.state} ${params.zip}`;
  const formattedDate = params.preferredDate
    ? new Date(params.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    : 'Not provided';
  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb;border-radius:16px 16px 0 0;padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#bfdbfe;">
                Mechanical Specialties LLC
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;">
                New Service Request
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#bfdbfe;">
                ${params.service}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:28px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

              <!-- Contact Info -->
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Contact Info</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${[
                  ['Name', params.name],
                  ['Email', params.email],
                  ['Phone', formatPhoneNumber(params.phone) || 'Not provided'],
                  ['Address', address],
                ]
                  .map(
                    ([label, value]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:140px;">
                    <span style="font-size:12px;font-weight:700;color:#64748b;">${label}</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:13px;color:#0f172a;">${value}</span>
                  </td>
                </tr>`
                  )
                  .join('')}
              </table>

              <!-- Service Details -->
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Service Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${[
                  ['Service', params.service],
                  [
                    'Best Time to Call',
                    params.bestTimeToCall || 'Not provided',
                  ],
                  ['Preferred Date', formattedDate || 'Not provided'],
                  [
                    'Register for Updates',
                    params.registerForUpdates === 'true' ? 'Yes' : 'No',
                  ],
                ]
                  .map(
                    ([label, value]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:140px;">
                    <span style="font-size:12px;font-weight:700;color:#64748b;">${label}</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:13px;color:#0f172a;">${value}</span>
                  </td>
                </tr>`
                  )
                  .join('')}
              </table>

              <!-- Description -->
              ${
                params.message
                  ? `
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Description</p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;font-size:13px;color:#334155;line-height:1.6;">
                ${params.message.replace(/\n/g, '<br/>')}
              </div>`
                  : ''
              }

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Mechanical Specialties LLC &mdash; Serving Southeast Louisiana
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  await mailgunClient.messages.create(mailgunDomain, {
    from: mailgunFrom,
    to: [mailgunTo],
    subject: emailSubject,
    html: emailHtml,
    'h:Reply-To': params.email,
    attachment: params.photos.map((file) => ({
      data: file.buffer,
      filename: file.originalname,
      contentType: file.mimetype,
    })),
  });
}

// POST req to /api/contact/service-work
const upload = multer({ storage: multer.memoryStorage() });
contactRouter.post(
  '/service-work',
  upload.array('photos'),
  async (request: Request, response: Response) => {
    const requestBody = request.body as ContactRequestBody;
    const files = request.files as Express.Multer.File[];
    try {
      const requestBody = request.body as ContactRequestBody;

      const name = (requestBody.name ?? '').trim();
      const phone = (requestBody.phone ?? '').trim();
      const email = (requestBody.email ?? '').trim();
      const street = (requestBody.street ?? '').trim();
      const city = (requestBody.city ?? '').trim();
      const state = (requestBody.state ?? '').trim();
      const zip = (requestBody.zip ?? '').trim();
      const service = (requestBody.service ?? '').trim();
      const bestTimeToCall = (requestBody.bestTimeToCall ?? '').trim();
      const preferredDate = (requestBody.preferredDate ?? '').trim();
      const message = (requestBody.message ?? '').trim();
      const registerForUpdates = requestBody.registerForUpdates ?? false;

      if (!name || !email || !service) {
        return response.status(400).json({
          ok: false,
          error: 'Missing required fields',
        });
      }

      await sendContactEmail({
        name,
        phone,
        email,
        street: requestBody.street ?? '',
        city: requestBody.city ?? '',
        state: requestBody.state ?? '',
        zip: requestBody.zip ?? '',
        service,
        bestTimeToCall,
        preferredDate,
        message,
        registerForUpdates,
        photos: files ?? [],
      });

      return response.status(200).json({
        ok: true,
        message: 'Contact request sent successfully',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return response.status(500).json({
        ok: false,
        error: 'Failed to send contact request',
      });
    }
  }
);
