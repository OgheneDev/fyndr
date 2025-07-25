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

  // Define allowed routes for each user type
  const merchantAllowedRoutes = [
    "/dashboard/open-requests",
    "/dashboard/messages",
    "/dashboard/profile",
    "/dashboard/request",
  ];
  const userAllowedRoutes = [
    "/dashboard",
    "/dashboard/my-requests",
    "/dashboard/messages",
    "/dashboard/profile",
    "/dashboard/request/user",
    "/dashboard/new-request"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (userType === "merchant" && !merchantAllowedRoutes.includes(pathname)) {
        router.push("/dashboard/open-requests"); // Default merchant route
      } else if (userType === "user" && !userAllowedRoutes.includes(pathname)) {
        router.push("/dashboard"); // Default user route
      }
    }, 2000); // Keep 2-second delay for logout
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