export function ToggleButtons({ activeTab, setActiveTab }) {
  return (
    <div className="relative flex justify-between border-b border-b-gray-400 mb-6">
      <div className="relative flex w-full">
        <button
          onClick={() => setActiveTab('completed')}
          className={`relative flex-1 py-3  text-sm font-medium transition-colors duration-300 ${
            activeTab === 'completed' ? 'text-[#121417] border-b-2 border-[#57132A]' : 'text-gray-400'
          }`}
        >
          Live Requests
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`relative flex-1 py-3  text-sm font-medium transition-colors duration-300 ${
            activeTab === 'pending' ? 'text-[#121417] border-b-2 border-[#57132A]' : 'text-gray-400'
          }`}
        >
          Awaiting Payment
        </button>
      </div>
    </div>
  );
}