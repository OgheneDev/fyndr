'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section 
      className='flex flex-col lg:flex-row md:gap-0 md:justify-between gap-5 p-5 pt-[100px] py-8 md:py-10 md:pb-18 md:pt-[160px] md:px-12 overflow-hidden'
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
    >
      <motion.div 
        className="text-content lg:w-1/2 overflow-hidden"
        variants={textVariants}
      >
        <article className='space-y-5 mb-7 text-center md:text-start'>
          <motion.h1 
            className='text-2xl md:text-5xl font-bold'
            variants={textVariants}
          >
            Connect with nearby <br className='hidden lg:block' />
            Merchants offering <br className='hidden lg:block' />
            services you need
          </motion.h1>
          <motion.p 
            className='space-y-2 text-sm'
            variants={textVariants}
          >
            At Fyndr, we believe finding trusted services should be simple, fast, and stress-free. That’s <br className='md:hidden' /> why we created a smart marketplace that <br className='md:hidden' /> connects people to verified providers in real <br className='md:hidden' /> estate, cleaning, auto, jobs, hospitality, and <br className='md:hidden' /> more, all in minutes.
            {isExpanded && (
              <span className='block mt-2'>
                For consumers, Fyndr puts everything you need at your fingertips, helping you compare options, save time, and choose with confidence.
                For merchants, we cut down ad costs and bring you targeted, ready-to-convert leads every day, so you can focus on growing your business.
                Fyndr is more than a platform, it’s your bridge to convenience, transparency, and opportunity nationwide.
              </span>
            )}
            <span className='block mt-2'>
              <motion.button
                className='text-[#004d00] cursor-pointer font-bold uppercase text-[10px]'
                onClick={() => setIsExpanded(!isExpanded)}
                variants={buttonVariants}
              >
                {isExpanded ? 'View Less' : 'Read More'}
              </motion.button>
            </span>
          </motion.p>
        </article>
        <article className='space-y-5 hidden md:block'>
          <h3 className='text-[16px] font-bold'>LET THE CLIENTS COME TO YOU</h3>
          <p className='text-sm'>Stop waiting for referrals. With Fyndr, your business is always visible to customers who are already searching for your services. No wasted ad spend, no guesswork, just direct, targeted requests that match what you offer. Join a nationwide hub where new clients find you every single day.</p>
        </article>
        {!isLoggedIn && (
          <motion.div 
            className='flex items-center justify-center md:justify-start md:mt-5 gap-4 md:gap-6'
            variants={buttonVariants}
          >
            <Link href={'/login'}>
              <motion.button 
                className='bg-[#004d00] text-white py-3 px-5 cursor-pointer rounded-md text-sm'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
            <Link href={'/register'}>
              <motion.button 
                className='bg-[#004d00] text-white py-3 px-5 cursor-pointer rounded-md text-sm'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        className="image-content lg:w-1/2 overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src={'https://res.cloudinary.com/dgc8cd67w/image/upload/v1757532789/conn_bjdfzp.png'}
          width={100}
          height={100}
          alt='Hero'
          className='w-full h-auto'
        />
        <article className='space-y-5 text-center md:hidden'>
          <h3 className='text-[16px] font-bold'>LET THE CLIENTS COME TO YOU</h3>
          <p className='text-sm'>Stop waiting for referrals. With Fyndr, your business is always visible to customers who are already searching for your services. No wasted ad spend, no guesswork, just direct, targeted requests that match what you offer. Join a nationwide hub where new clients find you every single day.</p>
        </article>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection