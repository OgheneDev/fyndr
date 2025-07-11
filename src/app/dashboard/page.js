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
      size: 'medium'
    },
    {
      id: 'car-parts',
      title: 'Car Parts',
      icon: 'images/car-parts.png',
      size: 'medium'
    },
    {
      id: 'car-hire',
      title: 'Car Hire',
      icon: 'images/carHire.png',
      size: 'medium'
    },
    {
      id: 'cleaning',
      title: 'Cleaning',
      icon: 'images/cleaning.png',
      size: 'medium'
    },
    {
      id: 'automobile-purchase',
      title: 'Automobile Purchase',
      icon: 'images/automobile.png',
      size: 'large'
    },
    {
      id: 'other-services',
      title: 'Other Home Services',
      icon: 'images/other-services.png',
      size: 'large'
    }
  ];

  // Map dashboard category id to new-request category
  const categoryMap = {
    'real-estate': 'real-estate',
    'car-parts': 'car-parts',
    'car-hire': 'car-hire',
    'cleaning': 'cleaning',
    'automobile-purchase': 'automobile'
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const mapped = categoryMap[categoryId];
    if (mapped) {
      router.push(`/dashboard/new-request?category=${mapped}`);
    }
  };

  return (
    <div className="min-h-screen relative bg-[url('/images/bg.jpg')]">
      {/* Content */}
      <div className="relative z-50 px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex-1"></div>
          <h1 className=" text-center text-xl text-white font-bold">
            Create Request
          </h1>
        </div>

        {/* Categories Container */}
        <div className="max-w-xs md:max-w-lg mx-auto">
          {/* Top Row - Medium Cards */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {categories.slice(0, 2).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="rounded-2xl p-4 cursor-pointer border-white border text-white w-32 h-32 md:w-36 md:h-36"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 mb-2">
                    <Image
                      src={category.icon}
                      alt={`${category.title} icon`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[12px] md:text-sm text-center leading-tight font-medium">{category.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Middle Row - Medium Cards */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {categories.slice(2, 4).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="rounded-2xl cursor-pointer p-4 border-white border text-white w-32 h-32 md:w-36 md:h-36"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 mb-2">
                    <Image
                      src={category.icon}
                      alt={`${category.title} icon`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[12px] md:text-sm text-center leading-tight font-medium">{category.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Row - Medium Cards */}
          <div className="grid grid-cols-2 gap-6">
            {categories.slice(4, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="rounded-2xl cursor-pointer p-4 border-white border text-white w-32 h-32 md:w-36 md:h-36"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 mb-2">
                    <Image
                      src={category.icon}
                      alt={`${category.title} icon`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[12px] md:text-sm text-center leading-tight font-medium">{category.title}</span>
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