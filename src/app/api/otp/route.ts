
import { sendOTP } from '@/lib/sendOTP';

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await sendOTP(email);
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log("OTP_ERROR:", error);
    // const err = error as Error;
    return new Response(JSON.stringify({ error:"Something went wrong" }), { status: 500 });
    // return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
