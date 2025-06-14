'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { info } from '@/data/data'

const WorldSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const textContentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const infoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  }

  const infoItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      x: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 200
      }
    }
  }

  return (
    <motion.section 
      className='px-5 py-8 md:py-17 md:px-12 bg-[#DBD0C84D] flex flex-col md:flex-row gap-5 md:gap-12'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className="image-content md:w-1/2"
        variants={imageVariants}
      >
        <Image
          src={'/images/man.jpg'}
          alt='Delivery Man'
          width={50}
          height={50}
          className='w-full h-auto'
        />
      </motion.div>

      <motion.div 
        className="text-content md:w-1/2"
        variants={textContentVariants}
      >
        <motion.h1 
          className='text-3xl md:text-5xl font-bold mb-5 md:mb-8'
          variants={titleVariants}
        >
          The whole world at <br className='hidden md:block' /> your fingertips
        </motion.h1>
        
        <motion.div 
          className='grid grid-cols-1 gap-5 md:gap-8 md:w-[60%]'
          variants={infoContainerVariants}
        >
          {info.map((item, index) => (
            <motion.div
              key={index}
              className='flex gap-5 items-start'
              variants={infoItemVariants}
              whileHover={{
                x: 5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div variants={iconVariants}>
                <Image
                  src={item.icon}
                  alt='icon'
                  width={30}
                  height={30}
                />
              </motion.div>
              <motion.article variants={infoItemVariants}>
                <motion.h3 
                  className='font-bold text-[15px] mb-1'
                  variants={infoItemVariants}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className='text-sm'
                  variants={infoItemVariants}
                >
                  {item.description}
                </motion.p>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default WorldSection