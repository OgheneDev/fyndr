import React, { useState } from 'react';

export function ToggleButtons({ activeTab, setActiveTab, merchants }) {
    return (
        <div className="relative flex justify-center border-b md:border-b-0 border-b-gray-400 mb-6">
            <div className="relative flex max-w-lg w-full md:max-w-2xl">
                <button
                    onClick={() => setActiveTab('details')}
                    className={`relative flex-1 py-3 px-4 text-sm font-medium transition-colors cursor-pointer duration-300 text-center ${
                        activeTab === 'details' ? 'text-[#121417]' : 'text-gray-400'
                    }`}
                >
                    Details
                </button>
                <button
                    onClick={() => setActiveTab('merchants')}
                    className={`relative flex-1 py-3 px-4 text-sm font-medium transition-colors duration-300 cursor-pointer text-center ${
                        activeTab === 'merchants' ? 'text-[#121417]' : 'text-gray-400'
                    }`}
                >
                    <span className="inline-flex items-center justify-center gap-2">
                        Merchants 
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full min-w-[24px]">
                            {merchants.length}
                        </span>
                    </span>
                </button>
                
                <button
                    onClick={() => setActiveTab('payment')}
                    className={`relative flex-1 py-3 px-4 text-sm font-medium transition-colors cursor-pointer duration-300 text-center ${
                        activeTab === 'payment' ? 'text-[#121417]' : 'text-gray-400'
                    }`}
                >
                    Payment
                </button>
                <div 
                    className={`absolute bottom-0 h-1 bg-[#57132A] rounded-t-md transition-all duration-300 ease-in-out ${
                        activeTab === 'details' ? 'left-0 w-1/3 md:left-[8.33%] md:w-1/6' :
                        activeTab === 'merchants' ? 'left-1/3 w-1/3 md:left-[41.67%] md:w-1/6' :
                        'left-2/3 w-1/3 md:left-[75%] md:w-1/6'
                    }`}
                ></div>
            </div>
        </div>
    );
}