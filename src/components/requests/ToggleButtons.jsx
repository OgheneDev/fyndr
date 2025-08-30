import React from 'react';

export function ToggleButtons({ activeTab, setActiveTab }) {
  return (
    <div className="relative flex justify-center border-b md:border-b-0 border-b-gray-400 mb-6">
      <div className="relative flex max-w-lg w-full md:max-w-2xl">
        <button
          onClick={() => setActiveTab('completed')}
          className={`relative flex-1 py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer duration-300 text-center whitespace-nowrap overflow-hidden ${
            activeTab === 'completed' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          <span className="block truncate">Live Requests</span>
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`relative flex-1 py-3 px-1 sm:px-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer duration-300 text-center whitespace-nowrap overflow-hidden ${
            activeTab === 'pending' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          <span className="block truncate">
            <span className="hidden sm:inline">Awaiting Payment</span>
            <span className="sm:hidden">Payment</span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab('cvs')}
          className={`relative flex-1 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer duration-300 text-center whitespace-nowrap overflow-hidden ${
            activeTab === 'cvs' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          <span className="block truncate">CVs</span>
        </button>
                
        {/* Enhanced sliding indicator */}
        <div 
          className={`absolute bottom-0 h-1 bg-gradient-to-r from-[#85CE5C] to-[#6BB847] rounded-t-md transition-all duration-300 ease-out shadow-sm ${
            activeTab === 'completed' ? 'left-0 w-1/3' :
            activeTab === 'pending' ? 'left-1/3 w-1/3' :
            'left-2/3 w-1/3'
          }`}
        ></div>
      </div>
    </div>
  );
}