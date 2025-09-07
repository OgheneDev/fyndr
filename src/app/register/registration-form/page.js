"use client";
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { Loader } from "@/components/ui/Loader";

export default function RegistrationFormPage() {
  const userType = useUserStore((s) => s.userType);
  const router = useRouter();
  const [regFlow, setRegFlow] = useState({});

  useEffect(() => {
    // Only access sessionStorage in the browser
    if (typeof window !== "undefined") {
      const storedRegFlow = JSON.parse(sessionStorage.getItem("reg_flow") || "{}");
      setRegFlow(storedRegFlow);

      // Redirect if userType or regFlow.userType is missing
      if (!userType || !storedRegFlow.userType) {
        router.replace("/register");
      }
    }
  }, [userType, router]);

  const handleSuccess = () => {
    // Only access sessionStorage in the browser
    if (typeof window !== "undefined") {
      const storedRegFlow = JSON.parse(sessionStorage.getItem("reg_flow") || "{}");
      if (storedRegFlow.userType === "merchant") {
        router.push("/dashboard/open-requests");
      } else {
        router.push("/dashboard");
      }
      sessionStorage.removeItem("reg_flow"); // Clear session storage on success
    }
  };

  // Render nothing or a fallback during prerendering
  if (!regFlow || Object.keys(regFlow).length === 0) {
    return <div><Loader /></div>;
  }

  return (
    <Suspense fallback={<div><Loader /></div>}>
      <RegistrationForm
        userType={userType}
        onSuccess={handleSuccess}
        initialStep={3}
        initMethod={regFlow.method}
        initPhone={regFlow.phone}
        initEmail={regFlow.email}
      />
    </Suspense>
  );
}