import React from 'react';
import { Instagram, Twitter } from 'lucide-react';
import { RiFacebookCircleFill, RiLinkedinBoxFill, RiYoutubeFill, RiRedditFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="bg-[#57132A] text-white px-5 md:px-12 py-8 md:py-10">
      {/* Top section with links and social icons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        {/* Left side links */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 lg:space-x-16">
          <a href="#" className="text-white hover:underline text-sm">Terms of Service</a>
          <a href="#" className="text-white hover:underline text-sm">Privacy Policy</a>
          <a href="#" className="text-white hover:underline text-sm">Site Map</a>
        </div>
        
        {/* Right side social media */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="text-white text-sm">Follow Us :</span>
          <div className="flex space-x-2 sm:space-x-3">
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2D2D2] cursor-pointer hover:opacity-80" />
            <RiFacebookCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2D2D2] cursor-pointer hover:opacity-80" />
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2D2D2] cursor-pointer hover:opacity-80" />
            <RiLinkedinBoxFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2D2D2] cursor-pointer hover:opacity-80" />
            <RiYoutubeFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2D2D2] cursor-pointer hover:opacity-80" />
            <RiRedditFill className="w-5 h-5 sm:w-5 sm:h-5 text-[#D2D2D2] cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>

      {/* Horizontal line */}
      <div className="border-t border-white/30 mb-8"></div>

      {/* Bottom section with columns */}
      <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
        {/* Left side columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-20">
          {/* Services column */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Services</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white hover:underline text-sm">Real Estate</a>
              <a href="#" className="block text-white hover:underline text-sm">Car Hire</a>
              <a href="#" className="block text-white hover:underline text-sm">Car Parts</a>
              <a href="#" className="block text-white hover:underline text-sm">Cleaning Services</a>
            </div>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white hover:underline text-sm">Help & Support</a>
              <a href="#" className="block text-white hover:underline text-sm">FAQ</a>
              <a href="#" className="block text-white hover:underline text-sm">Contact Us</a>
              <a href="#" className="block text-white hover:underline text-sm">Terms of Service</a>
              <a href="#" className="block text-white hover:underline text-sm">Privacy Policy</a>
            </div>
          </div>

          {/* About column */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">About</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white hover:underline text-sm">About Us</a>
              <a href="#" className="block text-white hover:underline text-sm">Become a Merchant</a>
              <a href="#" className="block text-white hover:underline text-sm">Services on Fynder</a>
              <a href="#" className="block text-white hover:underline text-sm">Pricing</a>
              <a href="#" className="block text-white hover:underline text-sm">Terms of Service</a>
              <a href="#" className="block text-white hover:underline text-sm">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="w-full lg:max-w-md mt-8 lg:mt-0">
          <h3 className="text-white text-xl  font-bold mb-6">Subscribe to our Newsletter</h3>
           <div className='bg-white px-3 md:px-5 py-3 w-full md:w-fit flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-10 rounded-sm'>
              <input 
                  type="email" 
                  placeholder='Your Email Address' 
                  className='w-full md:w-auto min-w-0 placeholder:text-[12px] outline-0 placeholder:text-[#000000]'
              />
              <button
                  className='w-full md:w-auto bg-[#57132A] text-white text-sm py-2 px-5 rounded-sm'
              >
                  Send
              </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;