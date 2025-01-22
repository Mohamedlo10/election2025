'use client';
import * as React from "react";

import { userDeConnection } from "@/app/api/auth/query";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "./ui/dialogConfirm";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const router = useRouter();
  const pathname = usePathname();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [error, setError] = useState('');

  const handleNavigation = () => {
    router.push(`/`);
  };

  const handleLogOut = async () => {
    setIsLoading(true);
  
    try {
      const { error }: any = await userDeConnection();
      if (error) {
        setError(error.message);
      } else {
        handleNavigation();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
    finally{
      setIsLoading(false)

    }
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-[#309670] h-[8vh]">
        <div className=" h-full text-white  text-3xl font-extrabold items-center justify-center flex ">
            AMEES
        </div>
      </SidebarHeader>
      <SidebarContent  className=" pt-8 bg-[#309670]">
      <button
            onClick={() => setDialogOpen(true)}
            className={`flex items-center gap-3 mx-4 rounded-lg lg:px-3 px-2 py-2 font-bold transition-all bg-white  text-[#35a77d] hover:bg-[#3f3d56] shadow-lg"}`}>
            <LogOut  className="h-8 w-4" />
            Deconnexion
          </button> 
          <ConfirmDialog
            isOpen={isDialogOpen}
            message={`Etes-vous sûr de vouloir-vous deconnecter ?`}
            onConfirm={() => {
              handleLogOut();
              setDialogOpen(false);
            }}
      onCancel={() => setDialogOpen(false)}
    />

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
export { SidebarGroupContent };

