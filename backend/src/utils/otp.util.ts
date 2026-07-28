import crypto from 'crypto';

// In a real production app, this would use Redis to cache OTPs with TTL
// Since we don't have Redis guaranteed yet, we use a simple in-memory Map for development
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const otpUtil = {
  generateOtp: (length: number = 6): string => {
    // Generate a secure random string of digits
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[crypto.randomInt(0, 10)];
    }
    return otp;
  },

  saveOtp: (identifier: string, otp: string, ttlMinutes: number = 5): void => {
    const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
    otpStore.set(identifier, { otp, expiresAt });
  },

  verifyOtp: (identifier: string, submittedOtp: string): boolean => {
    const record = otpStore.get(identifier);
    
    if (!record) return false;
    
    if (Date.now() > record.expiresAt) {
      otpStore.delete(identifier);
      return false; // Expired
    }
    
    if (record.otp === submittedOtp) {
      otpStore.delete(identifier); // OTP is single-use
      return true;
    }
    
    return false;
  },
};
