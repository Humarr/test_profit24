// app/api/verify-otp/route.ts
import { verifyOTP } from '@/lib/otpStore';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const isValid = await verifyOTP(email, otp);

  if (isValid) {
    return new Response(JSON.stringify({ success: true }));
  }

  return new Response(JSON.stringify({ success: false, error: 'Invalid or expired OTP' }), { status: 400 });
}
