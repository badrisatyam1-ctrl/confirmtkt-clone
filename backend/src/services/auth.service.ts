import { prisma } from '../utils/prisma.util';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { jwtUtil } from '../utils/jwt.util';
import { otpUtil } from '../utils/otp.util';
import { emailUtil } from '../utils/email.util';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthService {
  static async register(data: any) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    
    // Assign CUSTOMER role by default
    let customerRole = await prisma.role.findUnique({ where: { name: 'CUSTOMER' } });
    if (!customerRole) {
       customerRole = await prisma.role.create({ data: { name: 'CUSTOMER', description: 'Standard user' } });
    }

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        passwordHash,
        wallet: { create: { balance: 0 } },
        roles: { create: { roleId: customerRole.id } },
      },
      include: { roles: { include: { role: true } } },
    });

    const otp = otpUtil.generateOtp();
    otpUtil.saveOtp(user.email, otp);
    await emailUtil.sendOtpEmail(user.email, otp);

    return { message: 'Registration successful. OTP sent to email.', userId: user.id };
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { roles: { include: { role: true } } },
    });

    if (!user || !user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    if (!user.isVerified) {
      const otp = otpUtil.generateOtp();
      otpUtil.saveOtp(user.email, otp);
      await emailUtil.sendOtpEmail(user.email, otp);
      throw new Error('Email not verified. A new OTP has been sent.');
    }

    const roles = user.roles.map(r => r.role.name);
    const payload = { userId: user.id, email: user.email, roles };
    
    const accessToken = jwtUtil.signAccessToken(payload);
    const refreshToken = jwtUtil.signRefreshToken(payload);

    await prisma.userSession.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
    });

    return { user, accessToken, refreshToken };
  }

  static async verifyOtp(email: string, otp: string) {
    const user = await prisma.user.findUnique({ where: { email }, include: { roles: { include: { role: true } } } });
    if (!user) throw new Error('User not found');

    const isValid = otpUtil.verifyOtp(email, otp);
    if (!isValid) throw new Error('Invalid or expired OTP');

    if (!user.isVerified) {
      await prisma.user.update({ where: { id: user.id }, data: { isVerified: true } });
    }

    const roles = user.roles.map(r => r.role.name);
    const payload = { userId: user.id, email: user.email, roles };
    
    const accessToken = jwtUtil.signAccessToken(payload);
    const refreshToken = jwtUtil.signRefreshToken(payload);

    await prisma.userSession.create({
      data: { userId: user.id, refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    return { user, accessToken, refreshToken };
  }

  static async googleLogin(idToken: string) {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) throw new Error('Invalid Google token');

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
      include: { roles: { include: { role: true } } }
    });

    if (!user) {
      let customerRole = await prisma.role.findUnique({ where: { name: 'CUSTOMER' } });
      if (!customerRole) {
        customerRole = await prisma.role.create({ data: { name: 'CUSTOMER', description: 'Standard user' } });
      }

      user = await prisma.user.create({
        data: {
          firstName: payload.given_name || 'User',
          lastName: payload.family_name || '',
          email: payload.email,
          avatar: payload.picture,
          isVerified: true,
          wallet: { create: { balance: 0 } },
          roles: { create: { roleId: customerRole.id } },
        },
        include: { roles: { include: { role: true } } }
      });
    }

    const roles = user.roles.map(r => r.role.name);
    const jwtPayload = { userId: user.id, email: user.email, roles };
    
    const accessToken = jwtUtil.signAccessToken(jwtPayload);
    const refreshToken = jwtUtil.signRefreshToken(jwtPayload);

    await prisma.userSession.create({
      data: { userId: user.id, refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    return { user, accessToken, refreshToken };
  }

  static async logout(refreshToken: string) {
    await prisma.userSession.deleteMany({
      where: { refreshToken }
    });
  }

  static async refreshToken(oldRefreshToken: string) {
    const session = await prisma.userSession.findUnique({
      where: { refreshToken: oldRefreshToken },
      include: { user: { include: { roles: { include: { role: true } } } } }
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) await prisma.userSession.delete({ where: { id: session.id } });
      throw new Error('Invalid or expired refresh token');
    }

    try {
      jwtUtil.verifyRefreshToken(oldRefreshToken);
    } catch {
      await prisma.userSession.delete({ where: { id: session.id } });
      throw new Error('Invalid or expired refresh token');
    }

    const roles = session.user.roles.map(r => r.role.name);
    const payload = { userId: session.user.id, email: session.user.email, roles };
    
    const accessToken = jwtUtil.signAccessToken(payload);
    const newRefreshToken = jwtUtil.signRefreshToken(payload);

    await prisma.userSession.update({
      where: { id: session.id },
      data: { refreshToken: newRefreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  static async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return; // Do not leak user existence

    // Use OTP util for reset token (in memory for now)
    const resetToken = otpUtil.generateOtp(32); // 32 char token
    otpUtil.saveOtp(`reset_${email}`, resetToken, 15); // 15 mins expiry
    
    await emailUtil.sendPasswordResetEmail(email, resetToken);
  }

  static async resetPassword(token: string, newPassword: string) {
    // In a real app with DB-backed tokens, we'd look up the token. 
    // Here we assume the frontend passes the email, or we store the token mapping.
    // For simplicity in this mock, we'll assume the frontend passes email along with token, 
    // but the validator only asked for token. Let's assume we find the user by scanning (not ideal, but fine for in-memory mock).
    throw new Error('Not implemented for in-memory store. Needs email passed or DB-backed tokens.');
  }
}
