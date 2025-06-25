'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, MessageCircle, User, List } from 'lucide-react'
import Image from 'next/image'
import { useUserStore } from '@/store/userStore'

// Common menu items (for both user and merchant)
const commonMenuItems = [
    { icon: List, name: 'My requests', path: '/dashboard/requests' },
    { icon: MessageCircle, name: 'Messages', path: '/dashboard/messages' },
    { icon: User, name: 'Profile', path: '/dashboard/profile' }
]

// User-specific additional items
const userAdditionalItems = [
    { icon: Home, name: 'Home', path: '/dashboard' }
]

const Sidebar = () => {
    const pathname = usePathname();
    const { userType } = useUserStore();
    const sidebarClass = pathname === '/login' || pathname === '/register' || pathname === '/' ? 'hidden' : 'flex'
    
    // Combine menu items based on user type
    const menuItems = userType === 'user' 
        ? [...userAdditionalItems, ...commonMenuItems] 
        : [...commonMenuItems]; // Merchant gets only common items

    return (
        <div className={`bg-white w-[280px] flex-col h-full hidden md:${sidebarClass} fixed top-0 left-0 border-r border-gray-100`}>
            {/* Header */}
            <div className='px-6 py-6 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
                        <Image
                            src={'/images/sofia.png'}
                            alt='avatar'
                            width={40}
                            height={40}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div>
                        <p className='font-medium text-gray-900 text-base'>Sophia</p>
                        <Link href={'/profile'} className='text-sm text-gray-500 hover:text-gray-700'>
                            View profile
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Menu Items */}
            <div className="px-4 py-4 flex-1">
                <ul className='flex flex-col space-y-1'>
                    {menuItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = pathname === item.path
                        
                        return(
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={`py-3 px-4 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 hover:bg-gray-50
                                        ${isActive
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <Icon size={20} className={isActive ? 'text-gray-900' : 'text-gray-500'} />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar