"use client"
import { useState } from "react";
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation"; // Add this import
import Image from "next/image";
import Link from "next/link";

const RegistrationPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const setUserType = useUserStore((state) => state.setUserType);
  const router = useRouter(); // Add this line

  const handleTypeSelect = (type) => {
    setSelectedType(type); 
    setUserType(type); 
  }; 

  // Add this handler to redirect after registration
  const handleRegistrationSuccess = () => {
    if (selectedType === "merchant") {
      router.push("/dashboard/open-requests");
    } else { 
      router.push("/dashboard");
    }
  };

  if (selectedType) {
    return (
      <div className="min-h-screen py-8 px-4 lg:px-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Join Fyndr</h1>
          </div>
          <RegistrationForm userType={selectedType} onSuccess={handleRegistrationSuccess} />
        </div>
      </div>
    );
  }

  // Initial Selection Screen
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
          Already have an account? <Link href={'/login'}><span className='text-[#57132A] cursor-pointer  underline'>Sign in</span></Link>
        </p>
        
        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => handleTypeSelect('merchant')}
            className="w-full py-4 px-6 bg-white border-2 border-[#57132A] text-[#57132A] cursor-pointer rounded-lg transition-all duration-200"
          >
            Sign up as a Merchant
          </button>
          
          <button
            onClick={() => handleTypeSelect('user')}
            className="w-full py-4 px-6 bg-[#57132A] text-white cursor-pointer rounded-lg  transition-all duration-200"
          >
            Sign up as a Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;