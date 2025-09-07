"use client";
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { Loader } from "@/components/ui/Loader";

export default function MethodPage() {
  const userType = useUserStore((s) => s.userType);
  const router = useRouter();

  useEffect(() => {
    const regFlow = JSON.parse(sessionStorage.getItem("reg_flow") || "{}");
    if (!userType || !regFlow.userType) {
      router.replace("/register");
    }
  }, [userType, router]);

  const handleSuccess = () => {
    const regFlow = JSON.parse(sessionStorage.getItem("reg_flow") || "{}");
    if (regFlow.userType === "merchant") router.push("/dashboard/open-requests");
    else router.push("/dashboard");
    sessionStorage.removeItem("reg_flow"); // Clear session storage on success
  };

  return (
    <Suspense fallback={<Loader />}>
      <RegistrationForm userType={userType} onSuccess={handleSuccess} initialStep={1} />
    </Suspense>
  );
}