"use client"
import React, { useState } from 'react'
import { PhoneInput } from "@/components/general/PhoneInput";
import { OTPInput } from "@/components/general/OTPInput";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from "next/navigation";
import { requestMerchantOtp, verifyOtp, resendMerchantOtp } from '@/api/auth/merchants/requests';
import { requestUserOtp, resendUserOtp } from '@/api/auth/users/requests';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, User, Store } from 'lucide-react';

const LoginPage = () => {
  const [step, setStep] = useState(1); // Changed from 0 to 1
  const [method, setMethod] = useState(''); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [localUserType, setLocalUserType] = useState(null);
  const [error, setError] = useState(null);

  const setUserType = useUserStore((state) => state.setUserType);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const canProceedPhone = phoneNumber.trim().length >= 10;
  const canProceedEmail = email.includes('@') && email.includes('.');
  const canProceedOTP = otp.length === 4;

  // Always send phone number with +234 prefix
  const getFullPhoneNumber = () => {
    const trimmed = phoneNumber.trim();
    return trimmed.startsWith("+234") ? trimmed : `+234${trimmed}`;
  };

  const handleTypeSelect = (type) => { 
    setUserType(type);
    setLocalUserType(type);
    setStep(2); // Changed from 1 to 2
    setError(null);
  };

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setError(null);
  };

  const handlePhoneSubmit = async () => {
    if (!canProceedPhone) return;
    setIsLoading(true);
    setError(null);
    try {
      if (localUserType === "merchant") {
        await requestMerchantOtp({ number: getFullPhoneNumber() });
      } else {
        await requestUserOtp({ number: getFullPhoneNumber() });
      }
      setStep(3);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleEmailSubmit = async () => {
    if (!canProceedEmail) return;
    setIsLoading(true);
    setError(null);
    try {
      if (localUserType === "merchant") {
        await requestMerchantOtp({ email });
      } else {
        await requestUserOtp({ email });
      }
      setStep(3);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleOTPSubmit = async () => {
    if (!canProceedOTP) return;
    setIsLoading(true);
    setError(null);
    try {
      const verifyData = {
        userType: localUserType,
        otp
      };

      // Add either email or phone number based on selected method
      if (method === 'phone') {
        verifyData.number = getFullPhoneNumber();
      } else {
        verifyData.email = email;
      }

      const res = await verifyOtp(verifyData);
      if (res && res.data && res.data.token) {
        setAuth(res.data.token);
        setUserType(localUserType);
        if (localUserType === "merchant") {
          router.push("/dashboard/open-requests");
        } else {
          router.push("/dashboard");
        }
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError(null);
    try {
      if (localUserType === "merchant") {
        await resendMerchantOtp(method === 'phone' ? { number: getFullPhoneNumber() } : { email });
      } else {
        await resendUserOtp(method === 'phone' ? { number: getFullPhoneNumber() } : { email });
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
    setIsResending(false);
  };

  const handleBack = () => {
    setStep(1); // Changed from 0 to 1
    setError(null);
    setPhoneNumber('');
    setEmail('');
    setOtp('');
  };

  // Progress bar component
  const ProgressBar = () => (
    <div className="flex justify-between mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= stepNum 
              ? 'bg-[#541229] text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
          </div>
          {stepNum < 3 && (
            <div className={`h-1 w-16 mx-2 ${
              step > stepNum ? 'bg-[#541229]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  // Initial selection screen
  if (step === 1) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-48 h-48 mx-auto mb-8">
            <Image 
              src={"/images/live-chat.png" }
              alt="Chat safely illustration" 
              width={50}
              height={50}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Welcome Back to Fyndr 
          </h1>
          <p className="text-base  leading-relaxed">
            Sign in to continue chatting safely and securely.
          </p>
          <p className="mb-12 text-sm">
            Don&apos;t have an account? <Link href="/register"><span className="text-[#57132A] cursor-pointer underline">Sign up</span></Link>
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleTypeSelect('merchant')}
              className="w-full py-4 px-6 bg-white border-2 border-[#57132A] text-[#57132A] cursor-pointer rounded-lg transition-all duration-200"
            >
              Sign in as a Merchant
            </button>
            <button
              onClick={() => handleTypeSelect('user')}
              className="w-full py-4 px-6 bg-[#57132A] text-white cursor-pointer rounded-lg transition-all duration-200"
            >
              Sign in as a Customer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Combined method selection and input screen
  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleBack}
            className="cursor-pointer flex gap-3 items-center text-gray-600 text-sm hover:text-[#57132A] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to selection screen
          </button>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {localUserType === 'user' ? (
                <User className="w-6 h-6 text-[#541229] mr-2" />
              ) : (
                <Store className="w-6 h-6 text-[#541229] mr-2" />
              )}
              <h2 className="text-xl font-semibold capitalize">{localUserType} Login</h2>
            </div>
            <div className="w-[52px]"></div>
          </div>

          <ProgressBar />

          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How would you like to receive your verification code?</h3>
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => handleMethodSelect('phone')}
                  className={`w-full py-4 px-6 border-2 cursor-pointer rounded-lg ${
                    method === 'phone' 
                      ? 'border-[#57132A] text-[#57132A]' 
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Via Phone Number
                </button>
                <button
                  onClick={() => handleMethodSelect('email')}
                  className={`w-full py-4 px-6 border-2 cursor-pointer rounded-lg ${
                    method === 'email'
                      ? 'border-[#57132A] text-[#57132A]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Via Email
                </button>
              </div>

              {method === 'phone' ? (
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter your phone number"
                />
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
                />
              )}
            </div>
            <button
              onClick={method === 'phone' ? handlePhoneSubmit : handleEmailSubmit}
              disabled={method === 'phone' ? !canProceedPhone : !canProceedEmail || isLoading}
              className="w-full bg-[#541229] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send Code'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Update step numbers for OTP verification (now step 3)
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto space-y-8">
          <ProgressBar />
          <button
              onClick={handleBack}
              className="text-sm cursor-pointer flex gap-3 items-center text-gray-600 hover:text-[#57132A] transition-colors"
            >
              <ArrowLeft className='w-4 h-4' />
              Back to selection screen
            </button>
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}
          <div>
            <h2 className="text-xl font-semibold capitalize mb-2">{localUserType} Login</h2>
            <p className="text-gray-600 text-sm mb-4">
              Enter the 4-digit code sent to {method === 'phone' ? phoneNumber : email}
            </p>
            <OTPInput value={otp} onChange={setOtp} />
            <div className="text-sm mt-4 text-center">
              Didn&apos;t receive the code?{" "}
              <button 
                onClick={handleResendOTP}
                disabled={isResending || isLoading}
                className="text-[#57132A] cursor-pointer underline disabled:opacity-50"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
          </div>
          <button
            onClick={handleOTPSubmit}
            disabled={!canProceedOTP || isLoading || isResending}
            className="w-full bg-[#541229] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default LoginPage