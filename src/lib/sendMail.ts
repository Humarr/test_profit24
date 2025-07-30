import { transporter } from "./mailer";

/**
 * Generates a consistent, branded HTML template for your emails.
 */
export function generateBrandedEmail({
  content,
  ctaText,
  ctaUrl,
}: {
  content: string;
  ctaText?: string;
  ctaUrl?: string;
}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Profits24 Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8f8fc;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8fc; padding:20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 20px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#6B46C1; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; font-family:Arial, sans-serif; margin:0; font-size:24px;">
                  Profits24
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; font-family:Arial, sans-serif; color:#2D3748; font-size:16px; line-height:1.5;">
                ${content}

                ${
                  ctaText && ctaUrl
                    ? `
                    <div style="text-align:center; margin:40px 0;">
                      <a href="${ctaUrl}" style="background-color:#6B46C1; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; display:inline-block; font-weight:bold;">
                        ${ctaText}
                      </a>
                    </div>
                  `
                    : ""
                }
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#EDF2F7; padding:20px; text-align:center; font-family:Arial, sans-serif; color:#4A5568; font-size:12px; line-height:1.4;">
                <p style="margin:0;">
                  You received this email because you have an account with Profits24. If you have any questions, reach out to us at
                  <a href="mailto:contact@profits24traders.com" style="color:#6B46C1; text-decoration:none;">contact@profits24traders.com</a>.
                </p>
                <p style="margin:8px 0 0 0;">
                  &copy; ${new Date().getFullYear()} Profits24. All rights reserved.
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
}

/**
 * Sends an email with a consistent Profits24 brand template.
 * Automatically wraps your message content in the branded layout.
 */
export async function sendMail({
  to,
  subject,
  content,
  ctaText,
  ctaUrl,
  from = "Profits24 <contact@profits24traders.com>",
  attachments,
}: {
  to: string;
  subject: string;
  content: string;
  ctaText?: string;
  ctaUrl?: string;
  from?: string;
  attachments?: Array<{ filename: string; path: string; cid?: string }>;
}) {
  const html = generateBrandedEmail({ content, ctaText, ctaUrl });

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error
  }

  return true;
}
