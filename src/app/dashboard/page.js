"use client"
import { useState } from "react";
import { Bell } from "lucide-react";

const CreateRequestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const featuredService = {
    id: 'omega-laundry',
    title: 'Omega 9 Laundry Services',
    subtitle: 'Dry Cleaning and Cleaning Services',
    phone: '234 123 4556 432',
    icon: 'images/laundry.png'
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
  };

  const handleFeaturedServiceSelect = () => {
    console.log('Selected featured service:', featuredService.id);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/bg.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1"></div>
          <h1 className="text-white text-center text-2xl font-medium">
            Create Request
          </h1>
          <div className="flex-1 flex justify-end">
            <button className="p-2 text-white">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories Container */}
        <div className="max-w-sm mx-auto">
          {/* Top Row - Medium Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {categories.slice(0, 2).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="rounded-2xl p-6 text-white border border-white"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20">
                    <img 
                      src={category.icon} 
                      alt={`${category.title} icon`}
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
                className="rounded-2xl p-6 text-white border border-white"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20">
                    <img 
                      src={category.icon} 
                      alt={`${category.title} icon`}
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
              className="w-full border rounded-2xl p-6 text-white border-white"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20">
                  <img 
                    src={categories[4].icon} 
                    alt={`${categories[4].title} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-medium">{categories[4].title}</span>
              </div>
            </button>
          </div>

          {/* Featured Service Card */}
          <div className="mb-8">
            <button
              onClick={handleFeaturedServiceSelect}
              className="w-full rounded-2xl p-6 text-white border border-white"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img 
                    src={featuredService.icon} 
                    alt={`${featuredService.title} icon`}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="mb-1">{featuredService.title}</h3>
                  <p className="text-sm text-white/80 mb-2">{featuredService.subtitle}</p>
                  <p className="text-sm text-white/70 flex items-center">
                    <span className="mr-2">📞</span>
                    {featuredService.phone}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestPage;