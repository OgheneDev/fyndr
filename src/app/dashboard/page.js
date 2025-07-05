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
      icon: 'images/car-hire.png',
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
    <div className="min-h-screen relative">
      {/* Content */}
      <div className="relative z-10 px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex-1"></div>
          <h1 className=" text-center text-xl font-bold">
            Create Request
          </h1>
        </div>

        {/* Categories Container */}
        <div className="max-w-sm md:max-w-2xl mx-auto">
          {/* Top Row - Medium Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {categories.slice(0, 2).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="rounded-2xl p-6 cursor-pointer bg-[#57132A] text-white"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20">
                    <Image
                      src={category.icon}
                      alt={`${category.title} icon`}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center leading-tight">{category.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Middle Row - Medium Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {categories.slice(2, 4).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="rounded-2xl cursor-pointer p-6 bg-[#57132A] text-white"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20">
                    <Image
                      src={category.icon}
                      alt={`${category.title} icon`}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center leading-tight">{category.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Large Card - Automobile Purchase */}
          <div className="mb-4">
            <button
              onClick={() => handleCategorySelect(categories[4].id)}
              className="w-full  rounded-2xl p-6 cursor-pointer bg-[#57132A] text-white"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20">
                  <Image
                      src={categories[4].icon}
                      alt={`${categories[4].title} icon`}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                </div>
                <span className="text-lg font-medium">{categories[4].title}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;