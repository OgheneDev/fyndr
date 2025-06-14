'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { statistics } from '@/data/data'

const StatisticsSection = () => {
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

  const statItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 150
      }
    }
  }

  const numberVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4
      }
    }
  }

  return (
    <motion.section 
      className='px-5 py-8 md:p-12 md:py-10'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className='flex flex-wrap justify-between gap-5 md:gap-0'
        variants={containerVariants}
      >
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            className='flex flex-col items-center gap-2'
            variants={statItemVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { 
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }
            }}
          >
            <motion.h3 
              className='font-bold text-3xl'
              variants={numberVariants}
            >
              {stat.value}
            </motion.h3>
            <motion.p 
              className='text-sm'
              variants={titleVariants}
            >
              {stat.title}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default StatisticsSection