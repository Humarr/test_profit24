import { sendMail } from './sendMail';
import { generateOTP } from './generateOTP';
import { saveOTP } from './otpStore';

export async function sendOTP(email: string) {
    const otp = generateOTP();
    await saveOTP(email, otp);
    try {
    await sendMail({
        to: email,
        subject: "Your OTP Code",
        content: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        ctaText: "Verify Now",
        ctaUrl: "https://app.profits24traders.com/verify?token=abc123",
      });
    } catch (error) {
      console.log("OTP_ERROR:", error);
      throw error;
    }
}
