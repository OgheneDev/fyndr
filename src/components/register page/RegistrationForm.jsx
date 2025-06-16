import { useState } from "react";
import { PhoneInput } from "../general/PhoneInput";
import { OTPInput } from "../general/OTPInput";
import { UserDetailsForm } from "./UserDetailsForm";
import { MerchantDetailsForm } from "./MerchantDetailsForm";
import { User, Store, ChevronLeft, CheckCircle } from "lucide-react";

export const RegistrationForm = ({ userType, onBack }) => {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Details
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(2);
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 4) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(3);
  };

  const handleDetailsSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert(`${userType} registration completed successfully!`);
  };

  const canProceedPhone = phoneNumber.trim().length >= 10;
  const canProceedOTP = otp.length === 4;
  const canProceedDetails = userType === 'user' 
  ? formData.name && formData.email && formData.state && formData.lga && formData.location
  : formData.name && 
    formData.whatsappPhoneNumber && 
    formData.email && 
    formData.businessName && 
    formData.businessAddress && 
    formData.businessLocation;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center">
          {userType === 'user' ? (
            <User className="w-6 h-6 text-[#541229] mr-2" />
          ) : (
            <Store className="w-6 h-6 text-[#541229] mr-2" />
          )}
          <h2 className="text-xl font-semibold capitalize">{userType} Registration</h2>
        </div>
      </div>

      {/* Progress Bar */}
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

      {/* Form Steps */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Enter your phone number</h3>
            <p className="text-gray-600 text-sm mb-4">We'll send you a verification code to Whatsapp.</p>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your phone number"
            />
          </div>
          <button
            onClick={handlePhoneSubmit}
            disabled={!canProceedPhone || isLoading}
            className="w-full bg-[#541229] text-white py-3 rounded-full text-sm cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Enter verification code</h3>
            <p className="text-gray-600 text-sm mb-4">
              We sent a 4-digit code to {phoneNumber}
            </p>
            <OTPInput value={otp} onChange={setOtp} />
          </div>
          <button
            onClick={handleOTPSubmit}
            disabled={!canProceedOTP || isLoading}
            className="w-full bg-[#541229] text-white py-3 cursor-pointer rounded-lg font-semibold  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {userType === 'user' ? 'Complete your profile' : 'Business details'}
            </h3>
            {userType === 'user' ? (
              <UserDetailsForm formData={formData} onChange={setFormData} />
            ) : (
              <MerchantDetailsForm formData={formData} onChange={setFormData} />
            )}
          </div>
          <button
            onClick={handleDetailsSubmit}
            disabled={!canProceedDetails || isLoading}
            className="w-full bg-[#541229] text-white py-3 cursor-pointer rounded-lg font-semibold  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </div>
      )}

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center mt-6">
        By continuing, you agree to our{' '}
        <a href="#" className="text-[#541229] hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-[#541229] hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};