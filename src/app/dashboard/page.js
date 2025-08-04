"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Grid2X2PlusIcon } from "lucide-react";
import ServicesModal from "@/components/ui/ServicesModal";

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const categories = [
    {
      id: 'real-estate',
      title: 'Real Estate', 
      icon: 'images/house.png',
      hasContent: true
    },
    {
      id: 'car-parts',
      title: 'Car Parts',
      icon: 'images/car.png',
      hasContent: true
    },
    {
      id: 'car-hire',
      title: 'Car Hire',
      icon: 'images/hire.JPG',
      hasContent: true
    },
    {
      id: 'cleaning',
      title: 'Cleaning',
      icon: 'images/clean.png',
      hasContent: true
    },
    {
      id: 'automobile-purchase',
      title: 'Automobiles',
      icon: 'images/auto.PNG',
      hasContent: true
    },
  ];

  // Map dashboard category id to new-request category
  const categoryMap = {
    'real-estate': 'real-estate',
    'car-parts': 'car-parts',
    'car-hire': 'car-hire',
    'cleaning': 'cleaning',
    'automobile-purchase': 'automobile',
    'other-services': 'other-services',
    'plumbing': 'plumbing',
    'electrical': 'electrical',
    'painting': 'painting',
    'carpentry': 'carpentry',
    'gardening': 'gardening'
  };

  const handleCategorySelect = (categoryId) => {
    // Don't navigate for empty buttons
    if (!categories.find(cat => cat.id === categoryId)?.hasContent) {
      return;
    }
    
    // Show "Coming Soon" for other-services
    if (categoryId === 'other-services') {
      Swal.fire({
        icon: 'warning',
        title: 'Coming Soon',
        text: 'Other Home Services Coming Soon.',
        confirmButtonColor: '#541229'
      });
      return;
    }
    
    setSelectedCategory(categoryId);
    const mapped = categoryMap[categoryId];
    if (mapped) {
      router.push(`/dashboard/new-request?category=${mapped}`);
    }
  };

  return (
    <div className="min-h-screen relative pt-[72px] md:pt-[100px] pb-15 md:pb-0">
      {/* Content */}
      <div className="relative px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex-1"></div>
          <h1 className="text-center text-lg">
            Create Request
          </h1>
        </div>

        {/* Categories Container */}
        <div className="max-w-sm md:max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={` w-28 h-25 md:w-28 md:h-26 ${
                  category.hasContent 
                    ? 'cursor-pointer hover:bg-white/10 transition-colors' 
                    : 'cursor-default opacity-50'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-1 h-full mx-auto">
                  {category.hasContent && (
                    <>
                      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={category.icon}
                          alt={`${category.title} icon`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div> 
                      <span className="text-[10px] text-center font-medium">
                        {category.title}
                      </span>
                    </>
                  )}
                </div>
              </button>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-28 h-25 md:w-28 md:h-26 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="flex flex-col items-center justify-center space-y-1 h-full mx-auto">
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl flex items-center border border-gray-300 justify-center">
                  <Grid2X2PlusIcon className="w-10 h-10 md:w-12 md:h-12 text-gray-900" />
                </div>
                <span className="text-[10px] text-center font-medium">
                  More Services
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <ServicesModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectService={(category) => {
          router.push(`/dashboard/new-request?category=${category}`);
        }}
      />
    </div>
  );
};

export default DashboardPage;