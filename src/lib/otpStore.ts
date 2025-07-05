// lib/otpStore.ts
import { redis } from './redisClient';

const OTP_EXPIRY_SECONDS = 5 * 60; // 5 minutes

export async function saveOTP(email: string, otp: string) {
  // Store OTP with expiration
  await redis.set(`otp:${email}`, otp, {
    ex: OTP_EXPIRY_SECONDS,
  });
}

export async function verifyOTP(email: string, otp: string) {
  const storedOtp = await redis.get(`otp:${email}`);
  if (storedOtp && storedOtp === otp) {
    // Delete OTP after verification
    await redis.del(`otp:${email}`);
    return true;
  }
  return false;
}
