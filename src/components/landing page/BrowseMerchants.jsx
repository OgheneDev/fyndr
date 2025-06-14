'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { services } from '@/data/data'
import Image from 'next/image'

const BrowseMerchants = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const textVariants = {
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

  const servicesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const serviceCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
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
      id='services' 
      className='px-5 py-8 md:py-14 md:px-12'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.article 
        className='mb-10 text-center md:text-start'
        variants={containerVariants}
      >
        <motion.h2 
          className='text-2xl font-bold mb-3'
          variants={titleVariants}
        >
          Browse Merchants by Services
        </motion.h2>
        <motion.p 
          className='text-sm'
          variants={textVariants}
        >
          Check services we offer with merchants offering them
        </motion.p>
      </motion.article>

      <motion.div 
        className="flex flex-col md:flex-row gap-5"
        variants={servicesContainerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className='md:w-[294px]'
            variants={serviceCardVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div variants={imageVariants}>
              <Image
                src={service.image}
                width={50}
                height={50}
                alt='Service Image'
                className='w-full h-auto md:h-[230px] rounded-lg mb-5'
              />
            </motion.div>
            <motion.h3 
              className='font-bold'
              variants={textVariants}
            >
              {service.title}
            </motion.h3>
            <motion.p 
              className='text-sm text-[#856670]'
              variants={textVariants}
            >
              {service.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default BrowseMerchants