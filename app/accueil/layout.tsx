import Navbar from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="bg-[#309670]">
      <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger className=" m-4 h-8 w-8 lg:ml-4 p-3 bg-white" />

        </SidebarProvider>
      </div>
   
  
      <main className="flex-1 flex flex-col overflow-y-auto ">
      <Navbar />
        <div className="p-6">
            {children}
        </div></main>
    </div>
  )
}