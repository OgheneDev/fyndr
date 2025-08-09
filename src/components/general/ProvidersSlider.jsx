'use client'

import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import { Star } from 'lucide-react';

const createSlidingProviders = (items, itemsPerView) => {
  let result = [...items];
  
  const remainder = items.length % itemsPerView;
  if (remainder > 0 && remainder < itemsPerView) {
    const itemsToAdd = itemsPerView - remainder;
    result = [...result, ...items.slice(0, itemsToAdd)];
  }
  
  return result;
};

// Helper function to render stars based on rating
const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      size={12}
      className={`${
        index < rating 
          ? 'fill-yellow-400 text-yellow-400' 
          : 'text-gray-300'
      }`}
    />
  ));
};

const ProvidersSlider = () => {
    const serviceProviders = [
    {
      avatar: 'images/sofia.png',
      companyName: 'Omega 9 Laundry Services',
      rating: 4,
      location: 'FCT Abuja',
      phoneNumber: '+234 123 4556 432',
      coverPhoto: 'images/house.png',
    },
    {
      avatar: 'images/sofia.png',
      companyName: 'Omega 9 Laundry Services with Very Long Name',
      rating: 5,
      location: 'FCT Abuja',
      phoneNumber: '+234 123 4556 432',
      coverPhoto: 'images/house.png',
    },
    {
      avatar: 'images/sofia.png',
      companyName: 'Short Name',
      rating: 5,
      location: 'FCT Abuja',
      phoneNumber: '+234 123 4556 432',
      coverPhoto: 'images/house.png',
    },
  ];

   const [currentIndex, setCurrentIndex] = useState(0);
   const [isMobile, setIsMobile] = useState(true);
   const [isTransitioning, setIsTransitioning] = useState(false);
   const [touchStart, setTouchStart] = useState(0);
   const [touchEnd, setTouchEnd] = useState(0);
   const sliderRef = useRef(null);
   const [slidingProviders, setSlidingProviders] = useState(serviceProviders);

   // Number of items per view based on screen size
    const itemsPerView = isMobile ? 1 : 1;
       
   // Update Sliding Providers when view changes
    useEffect(() => {
        setSlidingProviders(createSlidingProviders(serviceProviders, itemsPerView));
    }, [itemsPerView]);

    // Calculate total number of pages
    const totalPages = Math.ceil(serviceProviders.length / itemsPerView);
        
        // Create properly grouped Providers for current view
        const getGroupedProviders = () => {
         const result = [];
        
            for (let i = 0; i < slidingProviders.length; i += itemsPerView) {
              result.push(slidingProviders.slice(i, i + itemsPerView));
            }
            
        return result;
    };

    // Check if mobile on mount and window resize
    useEffect(() => {
            const checkMobile = () => { 
              const wasMobile = isMobile;
              const newIsMobile = window.innerWidth < 768;
              setIsMobile(newIsMobile);
              
              // Reset to first slide when switching between mobile and desktop
              if (wasMobile !== newIsMobile) {
                setCurrentIndex(0);
                setIsTransitioning(false);
              }
            };
            
            // Initial check
            checkMobile();
            
            // Add resize listener
            window.addEventListener('resize', checkMobile);
            
            // Cleanup
            return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    // Handle slide change
      const handleSlideChange = (index) => {
        setIsTransitioning(true);
        setCurrentIndex(index);
    };

    // Handle the transition ending
      const handleTransitionEnd = () => {
        setIsTransitioning(false);
        
        // If we're at the last slide and it has duplicate items, we need to reset
        if (currentIndex === totalPages - 1 && getGroupedProviders.length % itemsPerView !== 0) {
          // This will happen after the animation completes
          const timeout = setTimeout(() => {
            if (currentIndex === totalPages - 1) {
              setCurrentIndex(0);
            }
          }, 5000); // Set a timeout before auto-resetting to first slide
          
          return () => clearTimeout(timeout);
        }
      };

      // Add helper functions to check slide availability
      const isFirstSlide = currentIndex === 0;
      const isLastSlide = currentIndex === totalPages - 1;
    
      // Modify navigation handlers to include checks
      const nextSlide = () => {
        if (isTransitioning || isLastSlide) return;
        const nextIndex = (currentIndex + 1) % totalPages;
        handleSlideChange(nextIndex);
      };
      
      const prevSlide = () => {
        if (isTransitioning || isFirstSlide) return;
        const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
        handleSlideChange(prevIndex);
      };
    
      // Touch handlers for swipe
      const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
      };
    
      const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
      };
    
      const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
          nextSlide();
        }
        if (touchStart - touchEnd < -50) {
          prevSlide();
        }
      };
    
      // Get grouped Providers
      const groupedProviders = getGroupedProviders();

  return (
    <div className='flex flex-col md:flex-row flex-wrap mx-auto mt-5 md:px-0 lg:px-0 gap-4 md:max-w-[700px]'>
        {/* Slider Container - Fixed width and overflow hidden */}
        <div
          ref={sliderRef}
          className='relative w-full overflow-hidden'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            {/* Slider Track - Fixed positioning */}
            <div
             className="flex transition-transform duration-700 ease-in-out"
             style={{
                width: `${groupedProviders.length * 100}%`,
                transform: `translateX(-${currentIndex * (100 / groupedProviders.length)}%)`
             }}
             onTransitionEnd={handleTransitionEnd}
            >
                {groupedProviders.map((group, groupedIndex) => (
                    <div
                     key={groupedIndex}
                     className='flex'
                     style={{ 
                        width: `${100 / groupedProviders.length}%`,
                        minWidth: 0 // This is crucial for text truncation
                     }}
                    >
                        {group.map((provider, index) => (
                            <div
                             key={`${groupedIndex}-${index}`}
                             className='relative min-h-[300px] md:min-h-[400px] flex-shrink-0 rounded-xl border'
                             style={{ 
                                width: `${100 / itemsPerView}%`,
                                backgroundImage: `url(${provider.coverPhoto})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                             }}
                            >
                                {/* Content overlay with proper text handling */}
                                <div className='absolute top-5 left-1/2 transform -translate-x-1/2 flex p-3 items-center bg-gray-100/90 backdrop-blur-sm rounded-full w-[90%] md:w-full md:max-w-[450px] max-w-[320px]'>
                                    <Image
                                      src={provider.avatar}
                                      alt="Service icon"
                                      width={50}
                                      height={50}
                                      className="mr-3 rounded-full flex-shrink-0"
                                    />
                                    <div className="flex flex-col min-w-0"> {/* min-w-0 allows text truncation */}
                                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                                            {provider.companyName}
                                        </h3>
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className="text-xs text-gray-600">{provider.rating}</span>
                                            <div className="flex gap-0.5">
                                                {renderStars(provider.rating)}
                                            </div>
                                        </div>
                                        <span className='text-xs'>{provider.location} {provider.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Navigation arrows and indicators */}
            <div className="flex justify-between mt-2 md:mt-6 w-full">
                <button 
                  onClick={prevSlide}
                  className={`p-2 rounded-full transition-colors ${
                    isFirstSlide 
                      ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                      : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
                  }`}
                  aria-label="Previous Provider"
                  disabled={isFirstSlide || isTransitioning}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Indicators */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === index ? 'bg-green-700 w-5' : 'border border-green-700'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      disabled={isTransitioning}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide}
                  className={`p-2 rounded-full transition-colors ${
                    isLastSlide 
                      ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                      : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
                  }`}
                  aria-label="Next Provider"
                  disabled={isLastSlide || isTransitioning}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProvidersSlider