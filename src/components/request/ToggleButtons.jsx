export function ToggleButtons({ activeTab, setActiveTab }) {
    return (
        <div className="relative flex justify-between border-b border-b-gray-400 mb-6">
            <div className="relative flex w-full">
                <button
                    onClick={() => setActiveTab('details')}
                    className={`relative flex-1 py-3 text-sm font-medium transition-colors duration-300 ${
                        activeTab === 'details' ? 'text-[#121417]' : 'text-gray-400'
                    }`}
                >
                    Details
                </button>
                <button
                    onClick={() => setActiveTab('merchants')}
                    className={`relative flex-1 py-3 text-sm font-medium transition-colors duration-300 ${
                        activeTab === 'merchants' ? 'text-[#121417]' : 'text-gray-400'
                    }`}
                >
                    Merchants
                </button>
                <button
                    onClick={() => setActiveTab('payment')}
                    className={`relative flex-1 py-3 text-sm font-medium transition-colors duration-300 ${
                        activeTab === 'payment' ? 'text-[#121417]' : 'text-gray-400'
                    }`}
                >
                    Payment
                </button>
                <div 
                    className={`absolute bottom-0 h-1 bg-[#57132A] rounded-t-md transition-all duration-300 ease-in-out ${
                        activeTab === 'details' ? 'left-4 right-2/3 mr-2' : 
                        activeTab === 'merchants' ? 'left-1/3 right-1/3 mx-1' : 
                        'left-2/3 right-4 ml-2'
                    }`}
                ></div>
            </div>
        </div>
    );
}