'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, MessageSquare, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '@/store/userStore'
import { getMerchantProfile } from '@/api/profile/merchants/requests'
import { getUserProfile } from '@/api/profile/users/request'
import { useAuthStore } from '@/store/authStore'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    const { userType, profile, setProfile, setUserType, setUserData } = useUserStore();
    const [profileLoading, setProfileLoading] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleLogout = () => {
    logout(); // Clear auth state
    setUserData(null);
    setProfile(null);
    router.replace("/"); // Navigate to home
  };

    useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

    useEffect(() => {
        let isMounted = true;
        const fetchProfile = async () => {
            if (!isLoggedIn) return;
            setProfileLoading(true);
            try {
                let data = null;
                if (userType === 'merchant') {
                    data = await getMerchantProfile();
                } else if (userType === 'user') {
                    data = await getUserProfile();
                }
                if (isMounted) setProfile(data);
            } catch {
                if (isMounted) setProfile(null);
            } finally {
                if (isMounted) setProfileLoading(false);
            }
        };
        if (userType === 'merchant' || userType === 'user') {
            fetchProfile();
        }
        return () => { isMounted = false; };
    }, [userType, isLoggedIn, setProfile]);

    const navItems = [
        {name: "Home", path: '/'},
        {name: "Services", path: '#services'},
        {name: "How it works", path: '#how-it-works'},
        {name: "Testimonials", path: '#testimonials'},
        {name: "Become a merchant", path: '#become-a-merchant'}
    ]

    const dropdownItems = [
        ...(userType === 'user' ? [
            { name: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard }
        ] : userType === 'merchant' ? [
            { name: 'My Dashboard', path: '/dashboard/open-requests', icon: LayoutDashboard }
        ] : []),
        { name: 'Profile', path: '/dashboard/profile', icon: User },
        { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
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

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut",
                staggerChildren: 0.05
            }
        },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    }

    const dropdownItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
    }

    const renderAvatar = () => {
        if (profileLoading) {
            return <div className="animate-pulse w-10 h-10 rounded-full bg-gray-200" />;
        }
        const avatarUrl = profile?.avatar;
        if (avatarUrl) {
            return (
                <Image
                    src={avatarUrl}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                />
            );
        }
        return (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={24} className="text-gray-500" />
            </div>
        );
    };

    return (
        <motion.header 
            className='p-5  md:px-12 flex justify-between w-full border-b border-gray-100 bg-white items-center fixed top-0 z-100'
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
                                                className="flex items-center px-6 py-4 text-gray-700 border-b border-gray-100 transition-colors"
                                            >
                                                <span className='text-[15px] font-medium'>{item.name}</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                    {isLoggedIn && dropdownItems.map((item, index) => (
                                        <motion.li 
                                            key={`dropdown-${index}`}
                                            variants={mobileNavItemVariants}
                                        >
                                            <Link
                                                href={item.path}
                                                onClick={toggleMenu}
                                                className="flex items-center px-6 py-4 text-gray-700 border-b border-gray-100 transition-colors gap-2"
                                            >
                                                <item.icon size={18} />
                                                <span className='text-[15px] font-medium'>{item.name}</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Login/Logout & Signup buttons */}
                            <motion.div 
                                className="p-6 border-t flex flex-col gap-3"
                                variants={mobileNavItemVariants}
                            >
                                {isLoggedIn ? (
                                    <motion.button 
                                        onClick={handleLogout}
                                        className='bg-[#57132A] text-white py-3 cursor-pointer rounded-full text-sm w-full'
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Logout
                                    </motion.button>
                                ) : (
                                    <>
                                        <Link href={'/login'}>
                                            <motion.button 
                                                className='bg-[#57132A] text-white py-3 cursor-pointer rounded-full text-sm w-full'
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
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Auth Section */}
            <motion.div 
                className='hidden md:flex gap-5 items-center cursor-pointer ml-auto'
                variants={navbarVariants}
            >
                {isLoggedIn ? (
                    <div className="relative">
                        <div onClick={toggleDropdown}>
                            {renderAvatar()}
                        </div>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    className="absolute right-0 mt-2 w-64 bg-gray-100 rounded-lg z-50"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="p-4 border-b">
                                        <div className="text-sm text-gray-900">
                                            {profileLoading ? (
                                                <div className="h-4 w-24 bg-gray-200 mb-2 rounded animate-pulse" />
                                            ) : (
                                                profile?.name || 'User'
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {profileLoading ? (
                                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                                            ) : (
                                                profile?.email || 'user@example.com'
                                            )}
                                        </div>
                                    </div>
                                    <ul className="pt-2 pb-12">
                                        {dropdownItems.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                variants={dropdownItemVariants}
                                            >
                                                <Link
                                                    href={item.path}
                                                    className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2"
                                                >
                                                    <item.icon size={18} />
                                                    {item.name}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <div className="p-4 border-t">
                                        <motion.button
                                            onClick={handleLogout}
                                            className="w-full text-center px-4 py-2 cursor-pointer text-sm text-gray-700 flex items-center justify-center gap-2"
                                        >
                                            Logout
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <>
                        <Link href={'/login'}>
                            <motion.button 
                                className='py-2 px-5 text-sm cursor-pointer'
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
                    </>
                )}
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