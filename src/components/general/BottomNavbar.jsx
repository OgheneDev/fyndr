"use client"
import { Home, MessageCircle, User, List } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserStore } from '@/store/userStore';

const commonMenuItems = [
  { icon: List, label: 'My requests', path: '/dashboard/requests' },
  { icon: MessageCircle, label: 'Messages', path: '/dashboard/messages' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' }
];
const userAdditionalItems = [
  { icon: Home, label: 'Home', path: '/dashboard' }
];

const BottomNavbar = () => {
  const pathname = usePathname();
  const { userType } = useUserStore();

  // Combine menu items based on user type
  const menuItems = userType === 'user'
    ? [...userAdditionalItems, ...commonMenuItems]
    : [...commonMenuItems];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 bg-blend-overlay bg-opacity-90 backdrop-blur-md border-opacity-20 md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {menuItems.map((item, idx) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex flex-col items-center py-2 px-4 transition-colors duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-white text-opacity-60 hover:text-white hover:text-opacity-80'
              }`}
            >
              <IconComponent
                className={`w-6 h-6 mb-1 ${
                  isActive ? 'text-white' : 'text-white text-opacity-60'
                }`}
              />
              <span className={`text-xs font-medium ${
                isActive ? 'text-white' : 'text-white text-opacity-60'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;