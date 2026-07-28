import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MailOpen } from 'lucide-react';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

type OtpForm = z.infer<typeof otpSchema>;

export default function VerifyOtpPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const email = location.state?.email;
  const message = location.state?.message;

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpForm) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await authApi.verifyOtp(email, data.otp);
      if (response.success) {
        setAuth(response.data.user, response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed. Invalid OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <MailOpen size={32} />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
          <p className="text-slate-500 text-sm">
            {message || `We've sent a 6-digit verification code to`} <br/>
            <span className="font-semibold text-slate-800">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Input 
              id="otp" 
              type="text" 
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-[1em] h-14 font-mono font-bold"
              {...register('otp')}
            />
            {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp.message}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl text-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Didn't receive the code?{' '}
          <button className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
}
