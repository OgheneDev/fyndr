'use client'

import React from 'react';
import { Instagram, Twitter } from 'lucide-react';
import { RiFacebookCircleFill, RiLinkedinBoxFill, RiYoutubeFill, RiRedditFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      className="bg-[#85CE5C] text-white px-5 md:px-12 py-8 md:py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top section with links and social icons */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0"
        variants={itemVariants}
      >
        {/* Left side links */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 lg:space-x-16">
          <Link href="#" className="text-white hover:underline text-sm">Terms of Service</Link>
          <Link href="#" className="text-white hover:underline text-sm">Privacy Policy</Link>
          <Link href="#" className="text-white hover:underline text-sm">Site Map</Link>
        </div>
        
        {/* Right side social media */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="text-white text-sm">Follow Us :</span>
          <div className="flex space-x-2 sm:space-x-3">
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFF] cursor-pointer hover:opacity-80" />
            <RiFacebookCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFF] cursor-pointer hover:opacity-80" />
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFF] cursor-pointer hover:opacity-80" />
            <RiLinkedinBoxFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFF] cursor-pointer hover:opacity-80" />
            <RiYoutubeFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFF] cursor-pointer hover:opacity-80" />
            <RiRedditFill className="w-5 h-5 sm:w-5 sm:h-5 text-[#FFFFF] cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Horizontal line */}
      <motion.div 
        className="border-t border-white/30 mb-8"
        variants={itemVariants}
      ></motion.div>

      {/* Bottom section with columns */}
      <motion.div 
        className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0"
        variants={itemVariants}
      >
        {/* Left side columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-20">
          {/* Services column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-medium mb-4 text-sm">Services</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-white hover:underline text-sm">Real Estate</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Car Hire</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Car Parts</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Cleaning Services</Link>
            </div>
          </motion.div>

          {/* Support column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-medium mb-4 text-sm">Support</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-white hover:underline text-sm">Help & Support</Link>
              <Link href="#" className="block text-white hover:underline text-sm">FAQ</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Contact Us</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Terms of Service</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Privacy Policy</Link>
            </div>
          </motion.div>

          {/* About column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-medium mb-4 text-sm">About</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-white hover:underline text-sm">About Us</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Become a Merchant</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Services on Fynder</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Pricing</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Terms of Service</Link>
              <Link href="#" className="block text-white hover:underline text-sm">Privacy Policy</Link>
            </div>
          </motion.div>
        </div>

        {/* Newsletter subscription */}
        <motion.div 
          className="w-full lg:max-w-md mt-8 lg:mt-0"
          variants={itemVariants}
        >
          <h3 className="text-white text-xl  font-bold mb-6">Subscribe to our Newsletter</h3>
           <div className='bg-white px-3 md:px-5 py-3 w-full md:w-fit flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-10 rounded-sm'>
              <input 
                  type="email" 
                  placeholder='Your Email Address' 
                  className='w-full md:w-auto min-w-0 placeholder:text-[12px] outline-0 placeholder:text-[#000000]'
              />
              <button
                  className='w-full md:w-auto bg-[#85CE5C] text-white text-sm py-2 px-5 rounded-sm cursor-pointer'
              >
                  Send
              </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;