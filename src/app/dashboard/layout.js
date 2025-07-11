'use client'

import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Sidebar from "@/components/general/Sidebar"
import BottomNavbar from "@/components/general/BottomNavbar"

// Load the Inter font with desired subsets or weights
const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }) {
  const pathname = usePathname()

  // Add any route where you want to hide sidebar and navbar
  const hideLayoutRoutes = ['/dashboard/new-request']
  const shouldHideLayout = hideLayoutRoutes.includes(pathname)

  return ( 
    <div className={`flex ${inter.className}`}>
      {!shouldHideLayout && <Sidebar />}
      <main className={`flex-1 ${!shouldHideLayout ? 'md:ml-[280px]' : ''}`}>
        <div className="mb-7 md:mb-0">
          {children}
        </div>
        {!shouldHideLayout && <BottomNavbar />}
      </main>
    </div>
  )
}
