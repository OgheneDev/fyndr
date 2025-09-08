"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/general/PhoneInput";
import { ArrowLeft, User, Store, Loader2 } from 'lucide-react';
import { requestMerchantOtp } from '@/api/auth/merchants/requests';
import { requestUserOtp } from '@/api/auth/users/requests';

export default function LoginMethod() {
  const router = useRouter();
  const [flow, setFlow] = useState(null);
  const [method, setMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('login_flow');
    if (!raw) {
      router.replace('/login');
      return;
    }
    setFlow(JSON.parse(raw));
  }, [router]);

  const getFullPhoneNumber = () => {
    const trimmed = phoneNumber.trim();
    return trimmed.startsWith("+234") ? trimmed : `+234${trimmed}`;
  };

  const canProceedPhone = phoneNumber.trim().length >= 10;
  const canProceedEmail = email.includes('@') && email.includes('.');

  const handleBack = () => {
    sessionStorage.removeItem('login_flow');
    router.push('/login');
  };

  const sendOtp = async () => {
    setError(null);
    if ((method === 'phone' && !canProceedPhone) || (method === 'email' && !canProceedEmail)) return;
    setIsLoading(true);
    try {
      if (flow.userType === 'merchant') {
        await requestMerchantOtp(method === 'phone' ? { number: getFullPhoneNumber() } : { email });
      } else {
        await requestUserOtp(method === 'phone' ? { number: getFullPhoneNumber() } : { email });
      }
      // persist selected method + contact and reset countdown
      const newFlow = { ...flow, method, phone: method === 'phone' ? getFullPhoneNumber() : null, email: method === 'email' ? email : null, countdown: 600 };
      sessionStorage.setItem('login_flow', JSON.stringify(newFlow));
      router.push('/login/verify-otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
    setIsLoading(false);
  };

  if (!flow) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <button onClick={handleBack} className="cursor-pointer flex gap-3 items-center text-gray-600 text-sm hover:text-[#85CE5C] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to selection screen
        </button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {flow.userType === 'user' ? (
              <User className="w-6 h-6 text-[#85CE5C] mr-2" />
            ) : (
              <Store className="w-6 h-6 text-[#85CE5C] mr-2" />
            )}
            <h2 className="text-xl font-semibold capitalize">{flow.userType} Login</h2>
          </div>
          <div className="w-[52px]"></div>
        </div>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How would you like to receive your verification code?</h3>
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setMethod('phone')}
                className={`w-full py-4 px-6 border-2 cursor-pointer rounded-lg ${method === 'phone' ? 'border-[#85CE5C] text-[#85CE5C]' : 'border-gray-200 text-gray-600'}`}
              >
                Via Phone Number
              </button>
              <button
                onClick={() => setMethod('email')}
                className={`w-full py-4 px-6 border-2 cursor-pointer rounded-lg ${method === 'email' ? 'border-[#85CE5C] text-[#85CE5C]' : 'border-gray-200 text-gray-600'}`}
              >
                Via Email
              </button>
            </div>

            {method === 'phone' ? (
              <PhoneInput value={phoneNumber} onChange={setPhoneNumber} placeholder="Enter your phone number" />
            ) : method === 'email' ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent outline-none transition-all"
              />
            ) : null}
          </div>

          <button
            onClick={sendOtp}
            disabled={method === '' || isLoading || ((method === 'phone') ? !canProceedPhone : !canProceedEmail)}
            className="w-full bg-[#85CE5C] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      </div>
    </div>
  );
}