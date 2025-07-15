"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  const categories = [
    {
      id: 'real-estate',
      title: 'Real Estate', 
      icon: 'images/real-estate.png',
      hasContent: true
    },
    {
      id: 'car-parts',
      title: 'Car Parts',
      icon: 'images/car-parts.png',
      hasContent: true
    },
    {
      id: 'car-hire',
      title: 'Car Hire',
      icon: 'images/carHire.png',
      hasContent: true
    },
    {
      id: 'cleaning',
      title: 'Cleaning Services',
      icon: 'images/cleaning.png',
      hasContent: true
    },
    {
      id: 'automobile-purchase',
      title: 'Automobile',
      icon: 'images/automobile.png',
      hasContent: true
    },
    {
      id: 'other-services',
      title: 'Other Home Services',
      icon: 'images/other-services.png',
      hasContent: true
    },
    {
      id: 'empty-1',
      title: '',
      icon: '',
      hasContent: false
    },
    {
      id: 'empty-2',
      title: '',
      icon: '',
      hasContent: false
    }
  ];

  // Map dashboard category id to new-request category
  const categoryMap = {
    'real-estate': 'real-estate',
    'car-parts': 'car-parts',
    'car-hire': 'car-hire',
    'cleaning': 'cleaning',
    'automobile-purchase': 'automobile',
    'other-services': 'other-services'
  };

  const handleCategorySelect = (categoryId) => {
    // Don't navigate for empty buttons
    if (!categories.find(cat => cat.id === categoryId)?.hasContent) {
      return;
    }
    
    setSelectedCategory(categoryId);
    const mapped = categoryMap[categoryId];
    if (mapped) {
      router.push(`/dashboard/new-request?category=${mapped}`);
    }
  };

  return (
    <div className="min-h-screen relative bg-[url('/images/bg.jpg')]  bg-no-repeat bg-cover pt-[72px] md:pt-[100px] pb-15 md:pb-0">
      {/* Content */}
      <div className="relative px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex-1"></div>
          <h1 className="text-center text-lg text-white">
            Create Request
          </h1>
        </div>

        {/* Categories Container */}
        <div className="max-w-sm md:max-w-2xl mx-auto">
          {/* Grid Layout - 2x2 on mobile, 4x2 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`rounded-2xl p-4 border-white border-2 text-white w-28 h-25 md:w-28 md:h-26 mx-auto ${
                  category.hasContent 
                    ? 'cursor-pointer hover:bg-white/10 transition-colors' 
                    : 'cursor-default opacity-50'
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-1">
                  {category.hasContent && (
                    <>
                      <div className="w-10 h-10 md:w-15 md:h-15 flex-shrink-0">
                        <Image
                          src={category.icon}
                          alt={`${category.title} icon`}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="md:text-[9px] text-[12px] text-center leading-tight">
                        {category.title}
                      </span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;