'use client'
import React from 'react'
import { motion } from 'framer-motion'

const NewsletterSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.25
      }
    }
  }

  const headerVariants = {
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

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 150
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

  const formVariants = {
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
        ease: "easeOut"
      }
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 200
      }
    }
  }

  return (
    <motion.section 
      className='px-5 py-8 md:p-12 md:py-10 bg-[#DBD0C84D] flex flex-col items-center'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.article 
        className='text-center space-y-3 mb-4'
        variants={headerVariants}
      >
        <motion.h2 
          className='font-bold text-2xl md:text-3xl'
          variants={titleVariants}
        >
          Subscribe to our Newsletter
        </motion.h2>
        <motion.p 
          className='text-[12px]'
          variants={subtitleVariants}
        >
          Subscribe to get latest news and updates from us
        </motion.p>
      </motion.article>

      <motion.div 
        className='bg-white px-3 md:px-5 py-3 w-full md:w-fit flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-10 rounded-sm'
        variants={formVariants}
      >
        <motion.input
          type="email"
          placeholder='Your Email Address'
          className='w-full md:w-auto min-w-0 placeholder:text-[12px] outline-0 placeholder:text-[#000000]'
          variants={inputVariants}
          whileFocus={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        />
        <motion.button
          className='w-full md:w-auto bg-[#57132A] text-white text-sm py-2 px-5 rounded-sm'
          variants={buttonVariants}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#6B1A30",
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
        >
          Send
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default NewsletterSection