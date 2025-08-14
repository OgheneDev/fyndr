// components/general/Sidebar.js
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, MessageCircle, User, List } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { getMerchantProfile } from "@/api/profile/merchants/requests";
import { getUserProfile } from "@/api/profile/users/request";

const commonMenuItems = [
  { icon: MessageCircle, name: "My Messages", path: "/dashboard/messages" },
  { icon: User, name: "My Profile", path: "/dashboard/profile" },
];

const userAdditionalItems = [
  { icon: Home, name: "My Dashboard", path: "/dashboard" },
  { icon: List, name: "My requests", path: "/dashboard/my-requests" },
];

const merchantAdditionalItems = [
  { icon: List, name: "My requests", path: "/dashboard/open-requests" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userType, profile, setProfile, setUserData, setUserType } = useUserStore();
  const { logout } = useAuthStore();
  const [profileLoading, setProfileLoading] = useState(false);

  const handleLogout = () => {
    logout(); // Clear auth state
    setUserData(null);
    setProfile(null);
    router.replace("/"); // Use replace to avoid adding to history
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      setProfileLoading(true);
      try {
        let data = null;
        if (userType === "merchant") {
          data = await getMerchantProfile();
        } else if (userType === "user") {
          data = await getUserProfile();
        }
        if (isMounted) setProfile(data);
      } catch {
        if (isMounted) setProfile(null);
      } finally {
        if (isMounted) setProfileLoading(false);
      }
    };
    if (userType === "merchant" || userType === "user") {
      fetchProfile();
    }
    return () => {
      isMounted = false;
    };
  }, [userType, setProfile]);

  const menuItems =
    userType === "user"
      ? [...userAdditionalItems, ...commonMenuItems]
      : userType === "merchant"
      ? [...merchantAdditionalItems, ...commonMenuItems]
      : [...commonMenuItems];

  const renderAvatar = () => {
    if (profileLoading) {
      return <div className="animate-pulse w-10 h-10 rounded-full bg-gray-200" />;
    }
    const avatarUrl = profile?.avatar;
    if (avatarUrl) {
      return (
        <Image
          src={avatarUrl}
          alt="avatar"
          width={40}
          height={40}
          className="object-cover rounded-full"
        />
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <User size={24} className="text-gray-500" />
      </div>
    );
  };

  return (
    <div className="bg-white w-[280px] flex-col h-full hidden lg:flex fixed top-0 left-0 border-r border-gray-100">
      <div className="px-4 py-4 flex-1 pt-[100px]">
        <ul className="flex flex-col space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`py-3 px-4 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 hover:bg-gray-50
                    ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                >
                  <Icon size={20} className={isActive ? "text-gray-900" : "text-gray-500"} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="px-4 py-4 border-t border-gray-100 flex items-center gap-3">
        {renderAvatar()}
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;