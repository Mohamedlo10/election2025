 "use client";
import { userDeConnection } from "@/app/api/auth/query";
// import { userDeConnection } from "@/app/api/auth/query";
// import { getSupabaseSession } from "@/lib/authMnager";
import {
  LogOut
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ConfirmDialog from "./ui/dialogConfirm";
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

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // setRole(getSupabaseSession())
      } catch (error) {
        console.error("Error fetching user details:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, []) 

  useEffect(() => {
    if (!pathname.startsWith("/dashboard/utilisateurs")) {
      setIsSubMenuOpen(false);
    }
  }, [pathname]);

  const handleLogOut = async () => {
    setIsLoading(true);
    setError('');
  
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
        <form>
          <div className="relative ">
          {/*   <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none h-12 bg-background bg-white shadow-sm pl-12  md:w-2/3 lg:w-1/2"
            /> */}
          </div>
        </form>
      </div>
      <div className="grid grid-cols-8 items-center gap-8 h-22 w-60">         
        <div className="col-span-2">
        <button
            onClick={() => setDialogOpen(true)}
            className={`flex items-center gap-3 rounded-lg lg:px-3 px-2 py-2 font-bold transition-all bg-[#35a77d]  text-white hover:bg-[#3f3d56] shadow-lg"}`}>
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
        </div>
      </div>
    
      
    </header>
    </div>
  )
}

export default Navbar