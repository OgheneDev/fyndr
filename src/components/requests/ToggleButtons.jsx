export function ToggleButtons({ activeTab, setActiveTab }) {
  return (
    <div className="relative flex justify-between border-b border-b-gray-400 mb-6">
      <div className="relative flex w-full">
        <button
          onClick={() => setActiveTab('completed')}
          className={`relative flex-1 py-3 text-sm font-medium transition-colors duration-300 ${
            activeTab === 'completed' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          Live Requests
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`relative flex-1 py-3 text-sm font-medium transition-colors duration-300 ${
            activeTab === 'pending' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          Awaiting Payment
        </button>
        
        {/* Sliding indicator */}
        <div 
          className={`absolute bottom-0 h-1 bg-[#57132A] rounded-t-md transition-all duration-300 ease-in-out ${
            activeTab === 'completed' ? 'left-4 right-[50%] mr-2' : 'left-[50%] ml-2 right-4'
          }`}
        ></div>
      </div>
    </div>
  );
}