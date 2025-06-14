'use client'
import React from 'react'
import { motion } from 'framer-motion'
import TestimonialsSlider from './TestimonialsSlider'

const TestimonialsSection = () => {
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

  const headerVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 200
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const sliderVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
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
      id='testimonials' 
      className='py-8 md:py-12 px-5 md:px-10'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.article 
        className='text-center space-y-3'
        variants={headerVariants}
      >
        <motion.h2 
          className='font-bold text-2xl'
          variants={titleVariants}
        >
          Testimonials
        </motion.h2>
        <motion.p 
          className='text-sm'
          variants={subtitleVariants}
        >
          What are our customers saying?
        </motion.p>
      </motion.article>
      
      <motion.div variants={sliderVariants}>
        <TestimonialsSlider />
      </motion.div>
    </motion.section>
  )
}

export default TestimonialsSection