"use client"
import { ArrowLeft, CircleArrowRight, Search, X} from "lucide-react"
import { useState, useEffect, useRef } from "react"

const ServicesModal = ({ isOpen, onClose, onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchInputRef = useRef(null)
  const modalRef = useRef(null)
  
  const additionalServices = [
    { id: 'automobile-purchase', title: 'Automobiles', category: 'automobile', description: 'Find your perfect car', icon: '🚗' },
    { id: 'beauty', title: 'Beauty', category: 'beauty', description: 'Make up, Lash Techs, Nail techs, Hair Stylists and more', icon: '💄' },
    { id: 'car-hire', title: 'Car Hire', category: 'car-hire', description: 'Short Hire, Long Hire, Airport Pickup, Travel Hire', icon: '🚙' },
    { id: 'car-parts', title: 'Car Parts', category: 'car-parts', description: 'Find all car parts', icon: '🔧' },
    { id: 'carpentry', title: 'Carpentry', category: 'carpentry', description: 'Carpentry Services', icon: '🪚' },
    { id: 'cleaning', title: 'Cleaning', category: 'cleaning', description: 'Cleaning Services', icon: '🧹' },
    { id: 'electrical', title: 'Electrician', category: 'electrical', description: 'Electrical Services', icon: '⚡' },
    //{ id: 'employment', title: 'Employment', category: 'employment', description: 'Get and post job availability requests', icon: '💼' },
    //{ id: 'event-management', title: 'Event Management Services', category: 'event-management', description: 'Catering Services, Event Planner, Bakers and Hiring Services', icon: '🎉' },
    //{ id: 'hospitality', title: 'Hospitality', category: 'hospitality', description: 'Apartment, Hotel, Gym and Spa services', icon: '🏨' },
    { id: 'mechanic', title: 'Mechanic', category: 'mechanic', description: 'Automobile Repairs', icon: '🔩' },
    { id: 'media', title: 'Media', category: 'media', description: 'Photography, Videography, Drone pilot, Cinematography', icon: '📸' },
    { id: 'plumbing', title: 'Plumbing', category: 'plumbing', description: 'Plumbing Services', icon: '🪠' },
    { id: 'real-estate', title: 'Real Estate', category: 'real-estate', description: 'Sales, Rentals, Shortlet', icon: '🏠' },
    { id: 'it', title: 'IT', category: 'it', description: 'Product Design, Development, Frontend & Backend Services', icon: '💻' },
  ]

  const filteredServices = additionalServices.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Reset search and focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("")
      setFocusedIndex(-1)
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev < filteredServices.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < filteredServices.length) {
            const service = filteredServices[focusedIndex]
            onSelectService(service.category)
            onClose()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, focusedIndex, filteredServices, onSelectService, onClose])

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50000 flex items-start md:items-center justify-center animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white w-full h-full md:h-auto md:max-w-2xl md:max-h-[85vh] md:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors duration-200 -ml-2"
              aria-label="Close modal"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">More Services</h2>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-6 border-b border-gray-50">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setFocusedIndex(-1)
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 text-gray-900 placeholder-gray-500 outline-0"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setFocusedIndex(-1)
                  searchInputRef.current?.focus()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto md:max-h-[60vh]">
          {filteredServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500 max-w-sm">
                Try adjusting your search terms or browse all available services below.
              </p>
            </div>
          ) : (
            <div className="p-4">
              {filteredServices.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => {
                    onSelectService(service.category)
                  }}
                  className={`w-full text-left p-4 cursor-pointer mb-2 border-b border-gray-300 ${
                    focusedIndex === index ? '' : ''
                  }`}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-[16px] text-gray-900 mb-1">
                          {service.title}
                        </h3>
                        <p className="text-[12px] md:text-sm  line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <CircleArrowRight 
                      className="h-6 w-6  flex-shrink-0 ml-4" 
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServicesModal