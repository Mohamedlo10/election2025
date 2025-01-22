'use client'
import { createClient } from '@/lib/supabaseClient';
import { CalendarClock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CSSProperties, useEffect, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import { userConnection, verifyVoterEmail } from './api/auth/query';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



export default function Home() {

  const router = useRouter()
  const [email, setemail] = useState('');
  const [envoyer, setEnvoyer] = useState(false);
  const [color] = useState("#ffffff");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  
   const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log(email)
      const { exists, error: verifyError } = await verifyVoterEmail(email);
  
      if (verifyError) {
        console.error("Error verifying email:", verifyError);
        alert("An error occurred while verifying your email.");
        return;
      }
  
      if (!exists) {
        alert("Vous etes pas autorise a voter");
        return;
      }
  
      const { data, error } = await userConnection(email);
      if (error) {
        console.error(error.message);
        alert("Failed to send magic link.");
      } else if (data) {
        localStorage.setItem("user_session", JSON.stringify(data.user));
        setEnvoyer(true);
      }
    } catch (err: any) {
      console.error(err.message || "An unexpected error occurred.");
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        // Redirigez l'utilisateur connecté vers une autre page
        router.push('/accueil');
      }
    };
    checkUserSession();
  }, []);
  

 useEffect(() => {
  // Synchronisez les champs avec l'état local lors du montage
  const storedMAil = (document.getElementById('email') as HTMLInputElement)?.value;
  // router.push('/accueil');

  if (storedMAil) setemail(storedMAil);
}, []);

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
   
     <section className=" sm:w-full h-screen overflow-hidden bg-[#36a37b] flex justify-center items-center lg:justify-evenly lg:py-6">
     <div className="flex flex-col bg-[#3f3d56] rounded-xl space-y-2 p-6 lg:p-50 my-4 lg:my-0">
     <div className="text-center text-white">
          <div className="w-full text-center font-bold text-2xl border-b border-solid p-6 font-quick">Connexion</div>
          <div className='pt-4 pb-8 text-center font-bold'>
            Plateforme de vote de l'AMEES
          </div>
        </div>
        {!envoyer?(<><form  onSubmit={handleLogin} className="flex flex-col space-y-6">
        <div className="relative flex flex-col items-center space-y-2">
            <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
            <input type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
             className="rounded-lg bg-[#F5F5F5]  h-16 w-80 px-20 text-[#3f3d56] font-bold placeholder-slate-400 placeholder-text-lg placeholder:font-bold placeholder:font-quick" placeholder="examples@gmail.com" />
        </div>
        

        <button type="submit" className="btn h-16 w-80 bg-[#50c59a] font-bold rounded-lg text-white text-base font-quick">Connexion</button>

        <div className="w-full flex justify-center space-x-1">
            <p className="text-slate-400 text-base font-quick">Mail pour vous connectez.</p>
           
        </div>
    </form></>):(
        <div className='flex w-full items-center gap-7 flex-col'>
          <div className='h-24 max-w-72 text-white text-center font-bold'>Un e-mail de confirmation a été envoyé à votre boîte mail. 
          Veuillez vérifier votre courrier pour valider votre compte.</div>
          <CalendarClock />
        </div>

    )}
 </div> 
    <img src="/undraw_voting_nvu7.svg" alt="" className="hidden  lg:block" />
    </section>
   
  );
}
