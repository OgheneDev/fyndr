"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function LoginSelection() {
  const router = useRouter();
  const setUserType = useUserStore((s) => s.setUserType);

  const handleTypeSelect = (type) => {
    setUserType(type);
    // persist flow state between routes
    sessionStorage.setItem('login_flow', JSON.stringify({ userType: type }));
    router.push('/login/method'); 
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-48 h-48 mx-auto mb-8">
          <Image 
            src={"/images/live-chat.png" }
            alt="Chat safely illustration" 
            width={50}
            height={50}
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Welcome Back to Fyndr 
        </h1>
        <p className="text-base  leading-relaxed">
          Sign in to continue chatting safely and securely.
        </p>
        <p className="mb-12 text-sm">
          Don&apos;t have an account? <Link href="/register"><span className="text-[#57132A] cursor-pointer underline">Sign up</span></Link>
        </p>
        <div className="space-y-4">
          <button
            onClick={() => handleTypeSelect('merchant')}
            className="w-full py-4 px-6 bg-white border-2 border-[#57132A] text-[#57132A] cursor-pointer rounded-lg transition-all duration-200"
          >
            Sign in as a Merchant
          </button>
          <button
            onClick={() => handleTypeSelect('user')}
            className="w-full py-4 px-6 bg-[#57132A] text-white cursor-pointer rounded-lg transition-all duration-200"
          >
            Sign in as a Customer
          </button>
        </div>
      </div>
    </div>
  );
}