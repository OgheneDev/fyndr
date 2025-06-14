'use client'

import React, {useState, useEffect, useRef} from 'react'
import { testimonials } from '@/data/data'
import Image from 'next/image'
import { RiDoubleQuotesL } from 'react-icons/ri';

const createSlidingTestimonials = (items, itemsPerView) => {
  let result = [...items];
  
  const remainder = items.length % itemsPerView;
  if (remainder > 0 && remainder < itemsPerView) {
    const itemsToAdd = itemsPerView - remainder;
    result = [...result, ...items.slice(0, itemsToAdd)];
  }
  
  return result;
};

const TestimonialsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
      const [isMobile, setIsMobile] = useState(true);
      const [isTransitioning, setIsTransitioning] = useState(false);
      const [touchStart, setTouchStart] = useState(0);
      const [touchEnd, setTouchEnd] = useState(0);
      const sliderRef = useRef(null);
      const [slidingWoks, setSlidingTestimonials] = useState(testimonials);
    
      // Number of items per view based on screen size
      const itemsPerView = isMobile ? 1 : 1;
    
      // Update Sliding Testimonials when view changes
      useEffect(() => {
        setSlidingTestimonials(createSlidingTestimonials(testimonials, itemsPerView));
      }, [itemsPerView]);
    
      // Calculate total number of pages
      const totalPages = Math.ceil(testimonials.length / itemsPerView);
    
      // Create properly grouped Testimonials for current view
      const getGroupedTestimonials = () => {
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
        if (currentIndex === totalPages - 1 && groupedTestimonials.length % itemsPerView !== 0) {
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
    
      // Get grouped Testimonials
      const groupedTestimonials = getGroupedTestimonials();
  return (
    <div className='flex flex-col md:flex-row flex-wrap mx-auto mt-10 px-1 md:px-0  lg:px-0 gap-4 md:max-w-xl overflow-hidden'>
        {/* Slider Container */}
        <div
          ref={sliderRef}
          className='relative overflow-hidden w-full'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            {/* Slider Track */}
            <div
             className="flex transition-transform duration-700 ease-in-out"
             style={{
                width: `${groupedTestimonials.length * 100}%`,
                transform: `translateX(-${currentIndex * 100 / groupedTestimonials.length}%)`
             }}
             onTransitionEnd={handleTransitionEnd}
            >
                {groupedTestimonials.map((group, groupedIndex) => (
                    <div
                     key={groupedIndex}
                     className='flex gap-5'
                     style={{ width: `${100 / groupedTestimonials.length}%` }}
                    >
                        {group.map((testimonial, index) => (
                            <div
                             key={`${groupedIndex}-${index}`}
                             className='w-full'
                             style={{ flex: `0 0 calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
                            >
                                <div
                                 className='flex flex-col items-center px-5'
                                >
                                    <RiDoubleQuotesL className='w-[50px] h-[50px] text-green-600 mb-5' />
                                    <p className='text-sm mb-3 text-center'>"{testimonial.quote}"</p>
                                    <p>{testimonial.customer}</p>
                                    <span className='text-[12px] mt-2'>Customer in {testimonial.location}</span>
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
          aria-label="Previous Testimonial"
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
          aria-label="Next Testimonial"
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

export default TestimonialsSlider