// pages/register/verify-otp/page.jsx
import { VerifyOtpClient } from "@/components/register page/VerifyOtpClient";

export default function VerifyOtpPage({ searchParams }) {
  const method = searchParams?.method || undefined;
  const phone = searchParams?.phone ? decodeURIComponent(searchParams.phone) : undefined;
  const email = searchParams?.email ? decodeURIComponent(searchParams.email) : undefined;

  return <VerifyOtpClient initialMethod={method} initialPhone={phone} initialEmail={email} />;
} 