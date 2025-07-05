import { sendMail } from '@/lib/sendMail';

export async function POST(req: Request) {
  const { to, subject, content, ctaText, ctaUrl, attachments } = await req.json();

  
  await sendMail({
    to: to,
    subject: subject,
    content: content,
    ctaText: ctaText,
    ctaUrl: ctaUrl,
    attachments: attachments,
  });

  return new Response(JSON.stringify({ success: true }));
}
