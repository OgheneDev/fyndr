"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { OTPInput } from "@/components/general/OTPInput";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from '@/store/authStore';
import { verifyOtp, resendMerchantOtp } from '@/api/auth/merchants/requests';
import { resendUserOtp } from '@/api/auth/users/requests';
import { ArrowLeft, Loader2 } from 'lucide-react';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function VerifyOtpPage() {
  const router = useRouter();
  const setUserType = useUserStore((s) => s.setUserType);
  const { setAuth } = useAuthStore();

  const [flow, setFlow] = useState(null);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem('login_flow');
    if (!raw) {
      router.replace('/login');
      return;
    }
    const parsed = JSON.parse(raw);
    setFlow(parsed);
    setCountdown(parsed.countdown ?? 3600);
  }, [router]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      }), 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [countdown]);

  const canProceedOTP = otp.length === 4;

  const handleBack = () => {
    // go back to method page to edit contact
    router.push('/login/method');
  };

  const handleOTPSubmit = async () => {
    if (!canProceedOTP || !flow) return;
    setIsLoading(true);
    setError(null);
    try {
      const verifyData = { userType: flow.userType, otp };
      if (flow.method === 'phone') verifyData.number = flow.phone;
      else verifyData.email = flow.email;

      const res = await verifyOtp(verifyData);
      if (res && res.data && res.data.token) {
        setAuth(res.data.token);
        setUserType(flow.userType);
        // cleanup
        sessionStorage.removeItem('login_flow');
        if (flow.userType === 'merchant') router.push('/dashboard/open-requests');
        else router.push('/dashboard');
      } else {
        throw new Error('No token');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    if (!flow) return;
    setIsResending(true);
    setError(null);
    try {
      if (flow.userType === 'merchant') {
        await resendMerchantOtp(flow.method === 'phone' ? { number: flow.phone } : { email: flow.email });
      } else {
        await resendUserOtp(flow.method === 'phone' ? { number: flow.phone } : { email: flow.email });
      }
      // reset countdown in session and local state
      const updated = { ...flow, countdown: 3600 };
      sessionStorage.setItem('login_flow', JSON.stringify(updated));
      setCountdown(3600);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
    setIsResending(false);
  };

  if (!flow) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        <button onClick={handleBack} className="text-sm cursor-pointer flex gap-3 items-center text-gray-600 hover:text-[#57132A] transition-colors">
          <ArrowLeft className='w-4 h-4' />
          Back to method selection
        </button>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <div>
          <h2 className="text-xl font-semibold capitalize mb-2">{flow.userType} Login</h2>
          <p className="text-gray-600 text-sm mb-4">
            Enter the 4-digit code sent to {flow.method === 'phone' ? flow.phone : flow.email}
          </p>
          <OTPInput value={otp} onChange={setOtp} />
          <div className="text-sm mt-4 text-center space-y-2">
            <p className="text-gray-500">
              Code expires in <span className="font-medium text-gray-700">{formatTime(countdown)}</span>
            </p>
            <p>
              Didn&apos;t receive the code?{" "}
              <button 
                onClick={handleResendOTP}
                disabled={isResending || isLoading}
                className="text-[#85CE5C] cursor-pointer underline disabled:opacity-50 inline-flex items-center gap-1"
              >
                {isResending && <Loader2 className="w-3 h-3 animate-spin" />}
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>

        <button
          onClick={handleOTPSubmit}
          disabled={!canProceedOTP || isLoading || isResending}
          className="w-full bg-[#85CE5C] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
      </div>
    </div>
  );
}
