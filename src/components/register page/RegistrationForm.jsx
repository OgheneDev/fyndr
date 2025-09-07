"use client";
import { useState, useEffect } from "react";
import { PhoneInput } from "../general/PhoneInput";
import { OTPInput } from "../general/OTPInput";
import { UserDetailsForm } from "./UserDetailsForm";
import { MerchantDetailsForm } from "./MerchantDetailsForm";
import { User, Store, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import {
  requestMerchantOtp,
  verifyOtp,
  registerMerchant,
  resendMerchantOtp,
} from "@/api/auth/merchants/requests";
import { requestUserOtp, registerUser, resendUserOtp } from "@/api/auth/users/requests";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const RegistrationForm = ({
  userType,
  onSuccess,
  initialStep = 1,
  initMethod = null,
  initPhone = null,
  initEmail = null,
}) => {
  const router = useRouter();
  const setUserType = useUserStore((state) => state.setUserType);
  const [step, setStep] = useState(initialStep);
  const [phoneNumber, setPhoneNumber] = useState(initPhone || "");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState(initMethod || "phone");
  const [email, setEmail] = useState(initEmail || "");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(3600);

  const { setAuth } = useAuthStore();

  useEffect(() => {
    // Load initial state from sessionStorage
    const regFlow = JSON.parse(sessionStorage.getItem("reg_flow") || "{}");
    if (regFlow.step) setStep(regFlow.step);
    if (regFlow.method) setMethod(regFlow.method);
    if (regFlow.phone) setPhoneNumber(regFlow.phone);
    if (regFlow.email) setEmail(regFlow.email);
  }, []);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getFullPhoneNumber = () => {
    const trimmed = phoneNumber.trim();
    return trimmed.startsWith("+234") ? trimmed : `+234${trimmed}`;
  };

  const canProceedEmail = email.includes("@") && email.includes(".");

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setError(null);
    sessionStorage.setItem(
      "reg_flow",
      JSON.stringify({ userType, step: 1, method: selectedMethod, phone: phoneNumber, email })
    );
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
      setCountdown(3600);
      setStep(2);
      sessionStorage.setItem(
        "reg_flow",
        JSON.stringify({ userType, step: 2, method, phone: getFullPhoneNumber(), email })
      );
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
      setCountdown(3600);
      setStep(2);
      sessionStorage.setItem(
        "reg_flow",
        JSON.stringify({ userType, step: 2, method, phone: phoneNumber, email })
      );
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
        await resendMerchantOtp(method === "phone" ? { number: getFullPhoneNumber() } : { email });
      } else {
        await resendUserOtp(method === "phone" ? { number: getFullPhoneNumber() } : { email });
      }
      setCountdown(3600);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
    setIsResending(false);
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 4) return;
    setIsLoading(true);
    setError(null);
    try {
      const verifyData = {
        otp,
        userType,
      };
      if (method === "phone") {
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
      sessionStorage.setItem(
        "reg_flow",
        JSON.stringify({ userType, step: 3, method, phone: phoneNumber, email })
      );
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleDetailsSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const registrationData = { ...formData };
      if (method === "email" && formData.number) {
        registrationData.number = formData.number.startsWith("+234")
          ? formData.number
          : `+234${formData.number}`;
      }
      if (userType === "merchant" && formData.whatsappNumber) {
        registrationData.whatsappNumber = formData.whatsappNumber.startsWith("+234")
          ? formData.whatsappNumber
          : `+234${formData.whatsappNumber}`;
      }
      if (method === "phone") {
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
        confirmButtonColor: "#85CE5C",
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
  const canProceedDetails =
    userType === "user"
      ? formData.name &&
        formData.state &&
        formData.lga &&
        formData.location &&
        (method === "phone" ? formData.email : formData.number)
      : formData.name &&
        formData.whatsappNumber &&
        formData.businessName &&
        formData.businessAddress &&
        formData.businessLocation &&
        formData.nin &&
        formData.servicesOffered &&
        formData.state &&
        formData.lga &&
        formData.avatar &&
        (method === "phone" ? formData.email : formData.number);

  const handleBack = () => {
    router.push("/register");
    sessionStorage.removeItem("reg_flow");
  };

  useEffect(() => {
    if (step === 1) {
      router.replace("/register/method");
    } else if (step === 2) {
      router.replace("/register/verify-otp");
    } else if (step === 3) {
      router.replace("/register/registration-form");
    }
  }, [step, router]);

  return (
    <div className="w-full max-w-md mx-auto mt-13 px-5 md:px-0">
      <button
        onClick={handleBack}
        className="cursor-pointer flex gap-3 items-center text-gray-600 text-sm hover:text-[#85CE5C] transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to selection screen
      </button>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {userType === "user" ? (
            <User className="w-6 h-6 text-[#85CE5C] mr-2" />
          ) : (
            <Store className="w-6 h-6 text-[#85CE5C] mr-2" />
          )}
          <h2 className="text-xl font-semibold capitalize">{userType} Registration</h2>
        </div>
        <div className="w-[52px]"></div>
      </div>
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= stepNum ? "bg-[#85CE5C] text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
            </div>
            {stepNum < 3 && (
              <div
                className={`h-1 w-16 mx-2 ${step > stepNum ? "bg-[#85CE5C]" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>
      {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How would you like to receive your verification code?</h3>
            <div className="space-y-4 mb-6">
              <button
                onClick={() => handleMethodSelect("phone")}
                className={`w-full py-4 px-6 border-2 cursor-pointer rounded-lg ${
                  method === "phone"
                    ? "border-[#85CE5C] text-[#85CE5C]"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                Via Phone Number
              </button>
              <button
                onClick={() => handleMethodSelect("email")}
                className={`w-full py-4 px-6 border-2 cursor-pointer rounded-lg ${
                  method === "email"
                    ? "border-[#85CE5C] text-[#85CE5C]"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                Via Email
              </button>
            </div>
            {method === "phone" ? (
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
                className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent outline-none transition-all"
              />
            )}
          </div>
          <button
            onClick={method === "phone" ? handlePhoneSubmit : handleEmailSubmit}
            disabled={method === "phone" ? !canProceedPhone : !canProceedEmail || isLoading}
            className="w-full bg-[#85CE5C] text-white py-3 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Sending..." : "Send Code"}
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Enter verification code</h3>
            <p className="text-gray-600 text-sm mb-4">
              We sent a 4-digit code to {method === "phone" ? phoneNumber : email}
            </p>
            <OTPInput value={otp} onChange={setOtp} />
            <div className="text-sm mt-4 text-center">
              <p className="text-gray-500">
                Code expires in{" "}
                <span className="font-medium text-gray-700">{formatTime(countdown)}</span>
              </p>
              Didn&apos;t receive the code?{" "}
              <button
                onClick={handleResendOTP}
                disabled={isResending || isLoading}
                className="text-[#85CE5C] cursor-pointer underline disabled:opacity-50 inline-flex items-center gap-1"
              >
                {isResending && <Loader2 className="w-3 h-3 animate-spin" />}
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </div>
          </div>
          <button
            onClick={handleOTPSubmit}
            disabled={!canProceedOTP || isLoading || isResending}
            className="w-full bg-[#85CE5C] text-white py-3 cursor-pointer rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {userType === "user" ? "Complete your profile" : "Business details"}
            </h3>
            {userType === "user" ? (
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
            className="w-full bg-[#85CE5C] text-white py-3 cursor-pointer rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Creating Account..." : "Complete Registration"}
          </button>
        </div>
      )}
      <p className="text-xs text-gray-500 text-center mt-6">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#85CE5C] hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#85CE5C] hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};