import Sidebar from "@/components/general/Sidebar"
import BottomNavbar from "@/components/general/BottomNavbar"

export default function DashboardLayout({children}) {
    return(
        <div className="flex">
          <Sidebar />
          <main className="flex-1 md:ml-[280px]">
           <div className="mb-7 md:mb-0">
            {children}
           </div>
           <BottomNavbar />
          </main>
        </div>
    )
}