"use client";

import React, { useState, useEffect } from 'react';
import { howItWorks } from '@/data/data';
import Image from 'next/image';

const HowItWorks = () => {
  const [isMobile, setIsMobile] = useState(true);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col md:flex-row flex-wrap mx-auto mt-10 md:mx-0 lg:px-0 gap-4 md:max-w-full">
      {howItWorks.map((work, index) => (
        <div
          key={index}
          className={`w-full ${isMobile ? '' : 'md:w-[calc(33.333%-16px)]'}`}
        >
          <div className="bg-white md:w-[380px] md:h-[260px] h-[280px] p-5 rounded-lg space-y-4">
            <Image
              src={work.image}
              alt="Image"
              width={40}
              height={40}
            />
            <article>
              <h3 className="text-xl font-bold mb-4">{work.title}</h3>
              <p className="text-sm">{work.description}</p>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;