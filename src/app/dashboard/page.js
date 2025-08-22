"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Grid2X2PlusIcon } from "lucide-react";
import ServicesModal from "@/components/new requests/ServicesModal";
import FeaturedProviders from "@/components/general/FeaturedProviders";

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      id: "real-estate",
      title: "Real Estate",
      icon: "images/house.png",
      hasContent: true,
    },
    {
      id: "car-parts",
      title: "Car Parts",
      icon: "images/car.png",
      hasContent: true,
    },
    {
      id: "employment",
      title: "Employment",
      icon: "images/employment.jpg",
      hasContent: true,
    },
    {
      id: "cleaning",
      title: "Cleaning",
      icon: "images/clean.png",
      hasContent: true,
    },
    {
      id: "automobile-purchase",
      title: "Automobiles",
      icon: "images/auto.PNG",
      hasContent: true,
    },
    {
      id: "car-hire",
      title: "Car Hire",
      icon: "images/hire.JPG",
      hasContent: true,
    },
    {
      id: "beauty",
      title: "Beauty",
      icon: "images/beauty.jpeg",
      hasContent: true,
    },
  ];

  // Filter categories for mobile: exclude Beauty and Carpenter
  const filteredCategories = isMobile
    ? categories.filter(
        (category) => category.id !== "beauty" && category.id !== "car-hire"
      )
    : categories;

  // Map dashboard category id to new-request category
  const categoryMap = {
    "automobile-purchase": "automobile",
    beauty: "beauty",
    "car-parts": "car-parts",
    "car-hire": "car-hire",
    carpentry: "carpenter",
    cleaning: "cleaning",
    electrical: "electrician",
    employment: "employment",
    "event-management": "event-management",
    hospitality: "hospitality",
    mechanic: "mechanic",
    media: "media",
    plumbing: "plumbing",
    "real-estate": "real-estate",
    it: "it", 
    employment: 'employment'
  };

  const handleCategorySelect = (categoryId) => {
    // Don't navigate for empty buttons
    if (!categories.find((cat) => cat.id === categoryId)?.hasContent) {
      return;
    }

    // Show "Coming Soon" for other-services
    if (categoryId === "other-services") {
      Swal.fire({
        icon: "warning",
        title: "Coming Soon",
        text: "Other Home Services Coming Soon.",
        confirmButtonColor: "#541229",
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
      <div className="relative px-0 py-8">
        {/* Header */}
        <div className="mb-5 md:mb-12">
          <div className="flex-1"></div>
          <h1 className="text-center text-lg">Create Request</h1>
        </div>

        {/* Categories Container */}
        <div className="flex justify-center pr-2 md:pr-0">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-8 w-full md:max-w-[700px] mx-auto">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-30 h-30 md:w-36 md:h-36 ${
                  category.hasContent
                    ? "cursor-pointer hover:bg-white/10 transition-colors"
                    : "cursor-default opacity-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-1 h-full">
                  {category.hasContent && (
                    <>
                      <div className="w-22 h-22 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={category.icon}
                          alt={`${category.title} icon`}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <span className="text-[10px] md:text-xs text-center font-medium">
                        {category.title}
                      </span>
                    </>
                  )}
                </div>
              </button>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-30 h-30 md:w-36 md:h-36 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="flex flex-col items-center justify-center space-y-1 h-full">
                <div className="w-22 h-22 md:w-32 md:h-32 flex-shrink-0 rounded-xl flex items-center border border-gray-300 justify-center">
                  <Grid2X2PlusIcon className="w-10 h-10 md:w-14 md:h-14 text-gray-900" />
                </div>
                <span className="text-[10px] md:text-xs text-center font-medium">
                  More Services
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <FeaturedProviders />
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
