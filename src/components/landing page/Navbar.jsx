"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        {name: "Home", path: '/'},
        {name: "Services", path: '#services'},
        {name: "How it works", path: '#how-it-works'},
        {name: "Testimonials", path: '#testimonials'},
        {name: "Become a merchant", path: '#become-a-merchant'}
    ]

    // Animation variants
    const navbarVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    }

    const logoVariants = {
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

    const navItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    const mobileMenuVariants = {
        hidden: {
            x: '100%',
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: "easeIn"
            }
        }
    }

    const mobileNavItemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    }

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.2 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    }

    return (
        <motion.header 
            className='p-5 md:py-8 md:px-12 flex justify-between w-full bg-white items-center fixed top-0 z-50'
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex gap-14 items-center">
                <motion.div variants={logoVariants}>
                    <Link href='/'>
                        <Image
                            src={'/images/logo.png'}
                            alt="Logo"
                            width={55}
                            height={40}
                        />
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <nav className='hidden md:block'>
                    <motion.ul 
                        className='flex items-center gap-5 text-sm'
                        variants={navbarVariants}
                    >
                        {navItems.map((item, index) => (
                            <motion.li 
                                key={index}
                                variants={navItemVariants}
                                whileHover={{ 
                                    y: -2,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Link href={item.path}>
                                    <span>{item.name}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </nav>
            </div>

            {/* Sliding Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className='h-full flex flex-col'>
                            {/* Header */}
                            <motion.div 
                                className='p-6 flex justify-between items-center border-b'
                                variants={mobileNavItemVariants}
                            >
                                <Link href='/'>
                                    <Image
                                        src={'/images/logo.png'}
                                        alt="Logo"
                                        width={50}
                                        height={35}
                                    />
                                </Link>
                                <motion.button 
                                    onClick={toggleMenu} 
                                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X size='24' />
                                </motion.button>
                            </motion.div>

                            {/* Navigation */}
                            <nav className='overflow-y-auto flex-grow'>
                                <ul className='py-4'>
                                    {navItems.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            variants={mobileNavItemVariants}
                                        >
                                            <Link
                                                href={item.path}
                                                onClick={toggleMenu}
                                                className="flex items-center px-6 py-4 text-gray-700 border-b border-gray-100 transition-colors hover:bg-gray-50"
                                            >
                                                <span className='text-[15px] font-medium'>{item.name}</span>
                                            </Link>
                                        </motion.li>
                                    ))} 
                                </ul>
                            </nav>

                            {/* Login & Signup buttons */}
                            <motion.div 
                                className="p-6 border-t flex flex-col gap-3"
                                variants={mobileNavItemVariants}
                            >
                                <Link href={'/login'}>
                                 <motion.button 
                                    className='bg-[#57132A] text-white py-3 rounded-full text-sm w-full'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Login
                                </motion.button>
                                </Link>
                                <Link href={'register'}>
                                    <motion.button 
                                    className='text-[#57132A] border border-[#57132A] py-3 rounded-full text-sm w-full'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Sign up
                                </motion.button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Login & Sign up buttons */}
            <motion.div 
                className='hidden md:flex gap-5 items-center cursor-pointer ml-auto'
                variants={navbarVariants}
            >
                <Link href={'/login'}>
                  <motion.button 
                    className='py-2 px-5 text-sm'
                    variants={buttonVariants}
                    whileHover={{ 
                        y: -1,
                        transition: { duration: 0.2 }
                    }}
                >
                    Login
                </motion.button>
                </Link>
                <Link href={'register'}>
                  <motion.button 
                    className='bg-[#57132A] text-white text-sm cursor-pointer py-2 px-5 rounded-md'
                    variants={buttonVariants}
                    whileHover={{ 
                        scale: 1.02,
                        y: -1,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Sign up
                </motion.button>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Menu size={30} onClick={toggleMenu} className="text-[#0A2F1E] md:hidden cursor-pointer" />
            </motion.div>

            {/* Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={toggleMenu}
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    />
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Navbar