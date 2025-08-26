'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const HeroSection = () => {
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
      className='flex flex-col lg:flex-row md:gap-0 md:justify-between gap-5 p-5 pt-[80px] md:py-10 md:pt-[160px] md:px-12 overflow-hidden'
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
            className='text-sm'
            variants={textVariants}
          >
            Connect with nearby Merchants offering services you<br className='hidden lg:block' />
            need Connect with nearby Merchants offering<br className='hidden lg:block' />
            services you need Connect with nearby Merchants<br className='hidden lg:block' />
            offering services you need Connect with nearby<br className='hidden lg:block' />
            Merchants offering services you need
          </motion.p>
        </article>
        <motion.div 
          className='flex items-center justify-center md:justify-start gap-4 md:gap-6'
          variants={buttonVariants}
        >
          <Link href={'/login'}>
            <motion.button 
            className='bg-[#85CE5C] text-white py-3 px-5 cursor-pointer rounded-md text-sm'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          </Link>
          <Link href={'/register'}>
          <motion.button 
            className='bg-[#85CE5C] text-white py-3 px-5 cursor-pointer rounded-md text-sm'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="image-content lg:w-1/2 overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src={'/images/hero.jpg'}
          width={100}
          height={100}
          alt='Hero'
          className='w-full h-auto'
        />
      </motion.div>
    </motion.section>
  )
}

export default HeroSection