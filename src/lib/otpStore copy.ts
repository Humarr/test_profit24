// lib/otpStore.ts
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export function saveOTP(email: string, otp: string) {
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 min expiry
}

export function verifyOTP(email: string, otp: string) {
  const record = otpStore.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false; // expired
  }
  if (record.otp === otp) {
    otpStore.delete(email); // invalidate after verification
    return true;
  }
  return false;
}
