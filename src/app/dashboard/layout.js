// app/dashboard/layout.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/landing page/Navbar";
import Sidebar from "@/components/general/Sidebar";
import BottomNavbar from "@/components/general/BottomNavbar";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { userType } = useUserStore();

  const hideLayoutRoutes = ["/dashboard/new-request"];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  useEffect(() => {
    // Add a slight delay to allow intentional logout navigation
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (userType === "merchant" && !pathname.startsWith("/dashboard/open-requests")) {
        router.push("/dashboard/open-requests");
      } else if (userType === "user" && !pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, userType, pathname, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`flex flex-col ${inter.className}`}>
      {!shouldHideLayout && <Navbar />}
      <div className="flex flex-1">
        {!shouldHideLayout && <Sidebar />}
        <main className={`flex-1 ${!shouldHideLayout ? "md:ml-[280px]" : ""}`}>
          <div className="mb-7 md:mb-0">{children}</div>
          {!shouldHideLayout && <BottomNavbar />}
        </main>
      </div>
    </div>
  );
}