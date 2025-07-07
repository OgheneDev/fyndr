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
          {activeTab === 'completed' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-[#57132A] rounded-t-md" 
                style={{ width: 'calc(100% - 2rem)' }}></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`relative flex-1 py-3 text-sm font-medium transition-colors duration-300 ${
            activeTab === 'pending' ? 'text-[#121417]' : 'text-gray-400'
          }`}
        >
          Awaiting Payment
          {activeTab === 'pending' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-[#57132A] rounded-t-md" 
             style={{ width: 'calc(100% - 2rem)' }}></div>
          )}
        </button>
      </div>
    </div>
  );
}