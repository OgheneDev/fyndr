// components/register page/VerifyOtpClient.jsx
"use client";
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";

export function VerifyOtpClient({ initialMethod, initialPhone, initialEmail }) {
  const [isMounted, setIsMounted] = useState(false);
  const userType = useUserStore((s) => s.userType);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
    if (userType === null || userType === undefined) {
      router.replace("/register");
    }
  }, [userType, router]);

  if (!isMounted) {
    return null; // Prevent rendering during prerendering
  }

  const method = searchParams?.get("method") || initialMethod || undefined;
  const phone = searchParams?.get("phone")
    ? decodeURIComponent(searchParams.get("phone"))
    : initialPhone || undefined;
  const email = searchParams?.get("email")
    ? decodeURIComponent(searchParams.get("email"))
    : initialEmail || undefined;

  const handleSuccess = () => {
    if (userType === "merchant") router.push("/dashboard/open-requests");
    else router.push("/dashboard");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm
        userType={userType}
        onSuccess={handleSuccess}
        initialStep={2}
        initMethod={method}
        initPhone={phone}
        initEmail={email}
      />
    </Suspense>
  );
}