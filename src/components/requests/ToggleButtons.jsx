export function ToggleButtons({ activeTab, setActiveTab }) {
  return (
    <div className="relative flex justify-center border-b md:border-b-0 border-b-gray-400 mb-6">
      <div className="relative flex max-w-lg w-full md:max-w-2xl">
        <button
          onClick={() => setActiveTab('completed')}
          className={`relative flex-1 py-3 px-4 text-sm font-medium transition-colors cursor-pointer duration-300 text-center ${
            activeTab === 'completed' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          Live Requests
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`relative flex-1 py-3 px-4 text-sm font-medium transition-colors cursor-pointer duration-300 text-center ${
            activeTab === 'pending' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          Awaiting Payment
        </button>
        
        {/* Sliding indicator */}
        <div 
          className={`absolute bottom-0 h-1 bg-[#85CE5C] rounded-t-md transition-all duration-300 ease-in-out ${
            activeTab === 'completed' ? 'left-0 w-1/2 md:left-[16.67%] md:w-1/6' : 'left-1/2 w-1/2 md:left-[66.67%] md:w-1/6'
          }`}
        ></div>
      </div>
    </div>
  );
}