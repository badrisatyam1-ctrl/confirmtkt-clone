// Mock implementation of Email and SMS for development

export const emailUtil = {
  sendOtpEmail: async (to: string, otp: string): Promise<void> => {
    console.log(`\n================ EMAIL MOCK ================`);
    console.log(`To: ${to}`);
    console.log(`Subject: Your TravelBooking OTP`);
    console.log(`Body: Your verification code is: ${otp}. It will expire in 5 minutes.`);
    console.log(`==========================================\n`);
  },

  sendPasswordResetEmail: async (to: string, resetToken: string): Promise<void> => {
    console.log(`\n================ EMAIL MOCK ================`);
    console.log(`To: ${to}`);
    console.log(`Subject: Password Reset Request`);
    console.log(`Body: Reset your password here: ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`);
    console.log(`==========================================\n`);
  }
};

export const smsUtil = {
  sendOtpSms: async (phone: string, otp: string): Promise<void> => {
    console.log(`\n================ SMS MOCK ================`);
    console.log(`To: ${phone}`);
    console.log(`Message: Your TravelBooking OTP is ${otp}`);
    console.log(`==========================================\n`);
  }
};
