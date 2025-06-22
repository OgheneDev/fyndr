import Sidebar from "@/components/general/Sidebar"

export default function DashboardLayout({children}) {
    return(
        <div className="flex">
          <Sidebar />
          <main className="flex-1 md:ml-[280px]">
           <div className="">
            {children}
           </div>
          </main>
        </div>
    )
}