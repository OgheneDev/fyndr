'use client'
import React from 'react'
import { motion } from 'framer-motion'
import HowItWorksSlider from './HowItWorksSlider'

const HowWeWork = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const sliderVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

  return (
    <motion.section 
      id='how-it-works' 
      className='px-5 py-8 md:py-17 md:px-12 bg-[#57132A]'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.article 
        className='text-white mb-3 text-center md:text-start'
        variants={containerVariants}
      >
        <motion.h2 
          className='text-2xl font-bold mb-3'
          variants={titleVariants}
        >
          How it Works?
        </motion.h2>
        <motion.p 
          className='text-sm'
          variants={textVariants}
        >
          Connect with nearby Merchants offering services you need Connect with nearby Merchants offering services you need Connect with nearby Merchants
        </motion.p>
      </motion.article>
      
      <motion.div variants={sliderVariants}>
        <HowItWorksSlider />
      </motion.div>
    </motion.section>
  )
}

export default HowWeWork