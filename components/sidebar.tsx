import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [ 
    {
      items: [
        {
          title: "Voter",
          url: "/accueil",
          isActive: true,
        },
        {
          title: "Resultat",
          url: "#",
          isActive: false,
        },
      
      ],
    },
   
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-[#309670] h-[8vh]">
        <div className=" h-full  text-2xl font-bold items-center justify-center flex ">
            AMEES
        </div>
      </SidebarHeader>
      <SidebarContent  className=" pt-8 bg-[#309670]">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem className=" text-lg p-4 font-bold px-4 py-2" key={item.title}>
                    <SidebarMenuButton className="text-lg p-4 font-bold"  asChild isActive={item.isActive}>
                      <a  href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
export { SidebarGroupContent }

