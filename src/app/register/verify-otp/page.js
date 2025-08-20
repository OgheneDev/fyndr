"use client"
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyOtpPage() {
  const userType = useUserStore((s) => s.userType);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!userType) {
      router.replace('/register');
    }
  }, [userType, router]);

  const method = searchParams?.get('method') || undefined;
  const phone = searchParams?.get('phone') ? decodeURIComponent(searchParams.get('phone')) : undefined;
  const email = searchParams?.get('email') ? decodeURIComponent(searchParams.get('email')) : undefined;

  const handleSuccess = () => {
    if (userType === "merchant") router.push("/dashboard/open-requests");
    else router.push("/dashboard");
  };

  return <RegistrationForm userType={userType} onSuccess={handleSuccess} initialStep={2} initMethod={method} initPhone={phone} initEmail={email} />;
}
