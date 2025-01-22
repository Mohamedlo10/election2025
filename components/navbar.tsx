 "use client";
// import { userDeConnection } from "@/app/api/auth/query";
// import { getSupabaseSession } from "@/lib/authMnager";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
// import ConfirmDialog from "./dialogConfirm";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [error, setError] = useState('');
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const handleNavigation = () => {
    router.push(`/`);
  };



  


  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="sweet-loading">
          <BeatLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-[8vh]">
    <header className="flex items-center gap-4 border-b bg-white px-10 h-[8vh] ">
      <div className="w-full">
          <div className="relative w-full">
            <div className=" lg:text-xl text-sm font-bold sm:w-full w-[100vw] items-center justify-center  text-[#3f3d56]">
              Choisissez-votre candidat
            </div>
          </div>
      </div>
      <div className="grid grid-cols-8 items-center gap-8 h-22 w-60">         
        <div className="col-span-2">
       
        </div>
      </div>
    
      
    </header>
    </div>
  )
}

export default Navbar