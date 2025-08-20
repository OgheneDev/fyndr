"use client"
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegistrationFormPage() {
  const userType = useUserStore((s) => s.userType);
  const router = useRouter();

  useEffect(() => {
    if (!userType) {
      router.replace('/register');
    }
  }, [userType, router]);

  const handleSuccess = () => {
    if (userType === "merchant") router.push("/dashboard/open-requests");
    else router.push("/dashboard");
  };

  return <RegistrationForm userType={userType} onSuccess={handleSuccess} initialStep={3} />;
}
