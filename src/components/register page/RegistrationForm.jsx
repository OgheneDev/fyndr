import { useState } from "react";
import { PhoneInput } from "../general/PhoneInput";
import { OTPInput } from "../general/OTPInput";
import { UserDetailsForm } from "./UserDetailsForm";
import { MerchantDetailsForm } from "./MerchantDetailsForm";
import { User, Store, CheckCircle } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { 
  requestMerchantOtp, 
  verifyOtp, 
  registerMerchant 
} from "@/api/auth/merchants/requests";
import { requestUserOtp, registerUser } from "@/api/auth/users/requests";
import Swal from "sweetalert2";

export const RegistrationForm = ({ userType, onSuccess }) => {
  const setUserType = useUserStore((state) => state.setUserType);
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Always send phone number with +234 prefix
  const getFullPhoneNumber = () => {
    const trimmed = phoneNumber.trim();
    return trimmed.startsWith("+234") ? trimmed : `+234${trimmed}`;
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      if (userType === "merchant") {
        await requestMerchantOtp({ number: getFullPhoneNumber() });
      } else {
        await requestUserOtp({ number: getFullPhoneNumber() })
      }
      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Please try again.", err);
    }
    setIsLoading(false);
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 4) return;
    setIsLoading(true);
    setError(null);
    try {
      console.log({ number: getFullPhoneNumber(), otp, userType: userType });
      const res = await verifyOtp({  number: getFullPhoneNumber(), otp, userType: userType });
      // Save token to localStorage if present
      console.log("OTP verify response:", res);
      if (res && res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      setStep(3);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.error("OTP verification error:", err);
    }
    setIsLoading(false);
  };
 
  // ...existing code...
const handleDetailsSubmit = async () => {
  setIsLoading(true);
  setError(null);
  try {
    if (userType === "merchant") {
      await registerMerchant({
        ...formData,
        number: getFullPhoneNumber() // <-- FIXED
      });
    } else {
      await registerUser({
        ...formData
      })
    }
    setUserType(userType);
    await Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Your account has been created.",
      confirmButtonColor: "#541229"
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (err) {
    setError("Registration failed. Please try again.");
  }
  setIsLoading(false);
};
// ...existing code...

  const canProceedPhone = phoneNumber.trim().length >= 10;
  const canProceedOTP = otp.length === 4;
  const canProceedDetails = userType === 'user' 
  ? formData.name && formData.email && formData.state && formData.lga && formData.location
  : formData.name &&  
    formData.whatsappNumber && 
    formData.email && 
    formData.businessName && 
    formData.businessAddress && 
    formData.businessLocation &&
    formData.nin &&
    formData.servicesOffered &&
    formData.state &&
    formData.lga &&
    formData.avatar

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
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

      {error && (
        <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
      )}

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
            className="w-full bg-[#541229] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            className="w-full bg-[#541229] text-white py-3 cursor-pointer rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            className="w-full bg-[#541229] text-white py-3 cursor-pointer rounded-lg text-sm  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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