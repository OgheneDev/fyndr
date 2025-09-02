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
    if (!userType) {
      router.replace("/register"); 
    }
  }, [userType, router]);

  const handleSuccess = () => {
    if (userType === "merchant") router.push("/dashboard/open-requests");
    else router.push("/dashboard");
  };

  return (
    <Suspense fallback={<Loader />}>
      <RegistrationForm
        userType={userType}
        onSuccess={handleSuccess}
        initialStep={1}
      />
    </Suspense>
  );
}