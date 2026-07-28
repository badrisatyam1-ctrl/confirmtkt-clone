import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googleAuthSchema,
} from '../validators/auth.validator';

const REFRESH_TOKEN_COOKIE = 'travelbooking_refresh_token';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await AuthService.register(data);
      res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const { user, accessToken, refreshToken } = await AuthService.login(data);

      const cookieMaxAge = data.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: cookieMaxAge,
      });

      res.status(200).json({ success: true, data: { user, accessToken } });
    } catch (error: any) {
      if (error.message.includes('Email not verified')) {
         return res.status(403).json({ success: false, message: error.message, requireOtp: true });
      }
      res.status(401).json({ success: false, message: error.message });
    }
  },

  async verifyOtp(req: Request, res: Response) {
    try {
      const data = verifyOtpSchema.parse(req.body);
      const { user, accessToken, refreshToken } = await AuthService.verifyOtp(data.email, data.otp);

      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ success: true, data: { user, accessToken } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async googleLogin(req: Request, res: Response) {
    try {
      const data = googleAuthSchema.parse(req.body);
      const { user, accessToken, refreshToken } = await AuthService.googleLogin(data.idToken);

      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ success: true, data: { user, accessToken } });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
      if (refreshToken) {
        await AuthService.logout(refreshToken);
        res.clearCookie(REFRESH_TOKEN_COOKIE);
      }
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Logout failed' });
    }
  },

  async refreshToken(req: Request, res: Response) {
    try {
      const oldRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
      if (!oldRefreshToken) {
        return res.status(401).json({ success: false, message: 'No refresh token provided' });
      }

      const { accessToken, refreshToken } = await AuthService.refreshToken(oldRefreshToken);

      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ success: true, data: { accessToken } });
    } catch (error: any) {
      res.clearCookie(REFRESH_TOKEN_COOKIE);
      res.status(401).json({ success: false, message: error.message });
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const data = forgotPasswordSchema.parse(req.body);
      await AuthService.forgotPassword(data.email);
      res.status(200).json({ success: true, message: 'If email exists, reset link sent.' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};
