import React from 'react';

export default function InfiniteScrollBanner() {
  const text = "Over 500 car real estate merchants registered";
  
  return (
    <div className="w-full bg-green-600 text-white py-2 overflow-hidden">
      <div className="scrolling-text">
        <span className="text-item">{text}</span>
        <span className="text-item">{text}</span>
        <span className="text-item">{text}</span>
      </div>
      
      <style jsx>{`
        .scrolling-text {
          display: flex;
          animation: scroll 15s linear infinite;
          width: fit-content;
        }
        
        .text-item {
          font-size: 0.875rem;
          padding: 0 2rem;
          white-space: nowrap;
          flex-shrink: 0;
          min-width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100vw);
          }
        }
        
        @media (max-width: 640px) {
          .text-item {
            font-size: 0.75rem;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}