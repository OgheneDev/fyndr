import { useState } from "react";
import { PhoneInput } from "../general/PhoneInput";
import { OTPInput } from "../general/OTPInput";
import { UserDetailsForm } from "./UserDetailsForm";
import { MerchantDetailsForm } from "./MerchantDetailsForm";
import { User, Store, CheckCircle, ArrowLeft } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { 
  requestMerchantOtp, 
  verifyOtp, 
  registerMerchant,
  resendMerchantOtp
} from "@/api/auth/merchants/requests";
import { requestUserOtp, registerUser, resendUserOtp } from "@/api/auth/users/requests";
import Swal from "sweetalert2";

export const RegistrationForm = ({ userType, onSuccess }) => {
  const setUserType = useUserStore((state) => state.setUserType);
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState('phone'); // Add method state
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  const { setAuth } = useAuthStore();

  // Always send phone number with +234 prefix
  const getFullPhoneNumber = () => {
    const trimmed = phoneNumber.trim();
    return trimmed.startsWith("+234") ? trimmed : `+234${trimmed}`;
  };

  // Add email validation
  const canProceedEmail = email.includes('@') && email.includes('.');

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setError(null);
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      if (userType === "merchant") {
        await requestMerchantOtp({ number: getFullPhoneNumber() });
      } else {
        await requestUserOtp({ number: getFullPhoneNumber() });
      }
      setStep(2);
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
      if (userType === "merchant") {
        await requestMerchantOtp({ email });
      } else {
        await requestUserOtp({ email });
      }
      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError(null);
    try {
      if (userType === "merchant") {
        await resendMerchantOtp(method === 'phone' ? { number: getFullPhoneNumber() } : { email });
      } else {
        await resendUserOtp(method === 'phone' ? { number: getFullPhoneNumber() } : { email });
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
    setIsResending(false);
  };

  // Update OTP submit to include email
  const handleOTPSubmit = async () => {
    if (otp.length !== 4) return;
    setIsLoading(true);
    setError(null);
    try {
      const verifyData = {
        otp,
        userType
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
        setUserType(userType);
      } else {
        throw new Error("No token received");
      }
      setStep(3);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };
 

const handleDetailsSubmit = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const registrationData = {
      ...formData
    };

    // Format phone numbers with +234 prefix if needed
    if (method === 'email' && formData.number) {
      registrationData.number = formData.number.startsWith("+234") 
        ? formData.number 
        : `+234${formData.number}`;
    }
    if (userType === "merchant" && formData.whatsappNumber) {
      registrationData.whatsappNumber = formData.whatsappNumber.startsWith("+234")
        ? formData.whatsappNumber
        : `+234${formData.whatsappNumber}`;
    }

    if (method === 'phone') {
      registrationData.number = getFullPhoneNumber();
    } else {
      registrationData.email = email;
    }

    if (userType === "merchant") {
      await registerMerchant(registrationData);
    } else {
      await registerUser(registrationData);
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


  const canProceedPhone = phoneNumber.trim().length >= 10;
  const canProceedOTP = otp.length === 4;
  const canProceedDetails = userType === 'user' 
    ? formData.name && formData.state && formData.lga && formData.location && (
      // Check for either email or phone based on verification method
      method === 'phone' ? formData.email : formData.number
    )
    : formData.name &&  
      formData.whatsappNumber && 
      formData.businessName && 
      formData.businessAddress && 
      formData.businessLocation &&
      formData.nin &&
      formData.servicesOffered &&
      formData.state &&
      formData.lga &&
      formData.avatar && (
        // Check for either email or phone based on verification method
        method === 'phone' ? formData.email : formData.number
      );

  const handleBack = () => {
    setUserType(null); // Reset user type in the store
  };

  return (
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
          {userType === 'user' ? (
            <User className="w-6 h-6 text-[#541229] mr-2" />
          ) : (
            <Store className="w-6 h-6 text-[#541229] mr-2" />
          )}
          <h2 className="text-xl font-semibold capitalize">{userType} Registration</h2>
        </div>
        <div className="w-[52px]"></div>
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
            <h3 className="text-lg font-medium mb-2">How would you like to receive your verification code?</h3>
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
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Enter verification code</h3>
            <p className="text-gray-600 text-sm mb-4">
              We sent a 4-digit code to {method === 'phone' ? phoneNumber : email}
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
              <UserDetailsForm 
                formData={formData} 
                onChange={setFormData}
                verificationMethod={method}
                verificationEmail={email}
                verificationPhone={phoneNumber}
              />
            ) : (
              <MerchantDetailsForm 
                formData={formData} 
                onChange={setFormData}
                verificationMethod={method}
                verificationEmail={email}
                verificationPhone={phoneNumber}
              />
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