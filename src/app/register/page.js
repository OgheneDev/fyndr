"use client"
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const RegistrationPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const setUserType = useUserStore((state) => state.setUserType);
  const router = useRouter(); // Add this line

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setUserType(type);
    // navigate to method selection route
    router.push('/register/method');
  }; 

  // Add this handler to redirect after registration
  const handleRegistrationSuccess = () => {
    if (selectedType === "merchant") {
      router.push("/dashboard/open-requests");
    } else { 
      router.push("/dashboard");
    }
  };

  // keep selection UI on this page; navigation happens in handleTypeSelect
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Placeholder Image */}
        <div className="w-48 h-48 mx-auto mb-8">
          <Image 
            src={"/images/live-chat.png"} 
            alt="Chat safely illustration" 
            width={50}
            height={50}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">
          Chat Safely On App
        </h1>
        
        {/* Description */}
        <p className=" text-base leading-relaxed">
          We keep communication secure — no spam, just real solutions.
        </p>

        <p className='mb-12 text-sm'>
          Already have an account? <Link href={'/login'}><span className='text-[#85CE5C] cursor-pointer  underline'>Sign in</span></Link>
        </p>
        
        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => handleTypeSelect('merchant')}
            className="w-full py-4 px-6 bg-white border-2 border-[#85CE5C] text-[#85CE5C] cursor-pointer rounded-lg transition-all duration-200"
          >
            Sign up as a Merchant
          </button>
          
          <button
            onClick={() => handleTypeSelect('user')}
            className="w-full py-4 px-6 bg-[#85CE5C] text-white cursor-pointer rounded-lg  transition-all duration-200"
          >
            Sign up as a Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;