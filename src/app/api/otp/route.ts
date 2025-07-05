
import { sendOTP } from '@/lib/sendOTP';

export async function POST(req: Request) {
  const { email } = await req.json();

  await sendOTP(email);

  return new Response(JSON.stringify({ success: true }));
}
