"use client"
import React, { useState } from 'react'
import { PhoneInput } from "@/components/general/PhoneInput";
import { OTPInput } from "@/components/general/OTPInput";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation"; // Add this import

const LoginPage = () => {
  const [step, setStep] = useState(0); // 0: select type, 1: phone, 2: otp
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localUserType, setLocalUserType] = useState(null);

  const setUserType = useUserStore((state) => state.setUserType);
  const router = useRouter(); // Add this line

  const canProceedPhone = phoneNumber.trim().length >= 10;
  const canProceedOTP = otp.length === 4;

  const handleTypeSelect = (type) => { 
    setUserType(type); // Save to store
    setLocalUserType(type); // For local rendering
    setStep(1);
  };

  const handlePhoneSubmit = async () => {
    if (!canProceedPhone) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(2);
  };

  const handleOTPSubmit = async () => {
    if (!canProceedOTP) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Redirect or show success (simulate login)
    if (localUserType === "merchant") {
      router.push("/dashboard/open-requests");
    } else {
      router.push("/dashboard");
    }
  };

  // Initial selection screen
  if (step === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-48 h-48 mx-auto mb-8">
            <img 
              src="/images/live-chat.png" 
              alt="Chat safely illustration" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Welcome Back to Fyndr
          </h1>
          <p className="text-base mb-12 leading-relaxed">
            Sign in to continue chatting safely and securely.
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

  // Phone input step
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold capitalize mb-2">{localUserType} Login</h2>
            <p className="text-gray-600 text-sm mb-4">Enter your phone number to receive a verification code.</p>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your phone number"
            />
          </div>
          <button
            onClick={handlePhoneSubmit}
            disabled={!canProceedPhone || isLoading}
            className="w-full bg-[#541229] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      </div>
    );
  }

  // OTP input step
  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold capitalize mb-2">{localUserType} Login</h2>
            <p className="text-gray-600 text-sm mb-4">
              Enter the 4-digit code sent to {phoneNumber}
            </p>
            <OTPInput value={otp} onChange={setOtp} />
          </div>
          <button
            onClick={handleOTPSubmit}
            disabled={!canProceedOTP || isLoading}
            className="w-full bg-[#541229] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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