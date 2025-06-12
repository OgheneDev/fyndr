"use client"

import React, { useState, useEffect, useRef } from 'react'
import { howItWorks } from '@/data/data';
import Image from 'next/image';

const createSlidingWorks = (items, itemsPerView) => {
  let result = [...items];
  
  const remainder = items.length % itemsPerView;
  if (remainder > 0 && remainder < itemsPerView) {
    const itemsToAdd = itemsPerView - remainder;
    result = [...result, ...items.slice(0, itemsToAdd)];
  }
  
  return result;
};

const HowItWorksSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  const [slidingWoks, setSlidingWorks] = useState(howItWorks);

  // Number of items per view based on screen size
  const itemsPerView = isMobile ? 1 : 3;

  // Update Sliding works when view changes
  useEffect(() => {
    setSlidingWorks(createSlidingWorks(howItWorks, itemsPerView));
  }, [itemsPerView]);

  // Calculate total number of pages
  const totalPages = Math.ceil(howItWorks.length / itemsPerView);

  // Create properly grouped works for current view
  const getGroupedWorks = () => {
    const result = [];

    for (let i = 0; i < slidingWoks.length; i += itemsPerView) {
      result.push(slidingWoks.slice(i, i + itemsPerView));
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
    if (currentIndex === totalPages - 1 && groupedWorks.length % itemsPerView !== 0) {
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

  // Get grouped works
  const groupedWorks = getGroupedWorks();

  return (
    <div className='flex flex-col md:flex-row flex-wrap mx-auto mt-10 md:mx-0 px-5 md:px-0 lg:px-0 gap-4 md:max-w-full overflow-hidden'>
        {/* Slider Container */}
        <div
          ref={sliderRef}
          className='relative overflow-hidden w-full'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            {/* Slider track */}
            <div
             className="flex transition-transform duration-700 ease-in-out"
             style={{
                width: `${groupedWorks.length * 100}%`,
                transform: `translateX(-${currentIndex * 100 / groupedWorks.length}%)`
             }}
             onTransitionEnd={handleTransitionEnd}
            >
                {groupedWorks.map((group, groupedIndex) => (
                    <div
                      key={groupedIndex}
                      className='flex gap-5'
                      style={{ width: `${100 / groupedWorks.length}%` }}
                    >
                        {group.map((work, index) => (
                            <div
                              key={`${groupedIndex}-${index}`}
                              className='w-full'
                              style={{ flex: `0 0 calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
                            >
                                <div className="bg-white md:w-[380px] h-[220px] md:h-[200px] p-5 rounded-lg space-y-4">
                                    <Image
                                      src={work.image}
                                      alt="Image"
                                      width={40}
                                      height={40}
                                    />
                                    <article>
                                        <h3 className='text-xl font-bold mb-4'>{work.title}</h3>
                                        <p className='text-sm'>{work.description}</p>
                                    </article>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

         {/* Navigation arrows and indicators */}
      <div className="flex justify-between mt-6 w-full">
        <button 
          onClick={prevSlide}
          className={`p-2 rounded-full transition-colors ${
            isFirstSlide 
              ? 'opacity-50 cursor-not-allowed bg-gray-100' 
              : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
          }`}
          aria-label="Previous work"
          disabled={isFirstSlide || isTransitioning}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Indicators - only show for real pages, not duplicate content */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-1 h-1 rounded-full transition-all cursor-pointer ${
                currentIndex === index ? 'bg-white ' : 'bg-gray-600'
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
          aria-label="Next work"
          disabled={isLastSlide || isTransitioning}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HowItWorksSlider