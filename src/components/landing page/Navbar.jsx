"use client"

import React, { useState } from 'react'
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
        {name: "Testimonial", path: '#testimonial'},
        {name: "Become a merchant", path: '#become-a-merchant'}
    ]

  return (
    <header className='p-5 flex justify-between items-center'>
       <Link href='/'>
         <Image
            src={'/images/logo.png'}
            alt="Logo"
            width={50}
            height={35}
        />
       </Link>

       {/* Sliding Menu */}
       <div className={`fixed top-0 right-0 h-full w-[280px] bg-white transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50 shadow-2xl`}>
            <div className='h-full flex flex-col'>
                {/* Header */}
                <div className='p-6 flex justify-between items-center border-b'>
                    <Link href='/'>
                      <Image
                        src={'/images/logo.png'}
                        alt="Logo"
                        width={50}
                        height={35}
                        />
                    </Link>
                    <button onClick={toggleMenu} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <X size='24' />
                    </button>
                </div>

                {/* Navigation */}
                <nav className='overflow-y-auto flex-grow'>
                    <ul className='py-4'>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                        href={item.path}
                                        onClick={toggleMenu}
                                        className={`flex items-center px-6 py-4 text-gray-700 border-b border-gray-100 transition-colors`}
                                    >
                                        <span className='text-[15px] font-medium'>{item.name}</span>
                                    </Link>
                            </li>
                        ))} 
                    </ul>
                </nav>

                {/* Login & Signup buttons */}
                <div className="p-6 border-t">
                    <button className='bg-[#57132A] text-white py-3 rounded-full text-sm w-full'>
                        Login
                    </button>
                </div>
            </div>
       </div>

       <Menu size={30} onClick={toggleMenu} className="text-[#0A2F1E] md:hidden" />

       {/* Overlay */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                onClick={toggleMenu}
            />
        )}
    </header>
  )
}

export default Navbar