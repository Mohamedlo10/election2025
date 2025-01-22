'use client'
import { createClient } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { CSSProperties, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import { createPassword } from '../api/auth/query';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export default function Page() {

  const router = useRouter()

  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [color] = useState("#ffffff");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('password');
  const [typeC, setTypeC] = useState('password');
  const searchParams = useSearchParams();
  const token = searchParams.get('access_token');


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setMessage("Token manquant dans l'URL.");
        return;
      }

      const { data: user, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        setMessage("Erreur lors de la récupération de l'utilisateur.");
      } else {
        setEmail(user.user.email || '');
      }
    };

    fetchUser();
  }, [token]);


  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  const   handleToggleConfirmP = () => {
    if (typeC === "password") {
      setTypeC("text");
    } else {
      setTypeC("password");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await createPassword(password);
      if (error) {
        setMessage("Erreur lors de la création du mot de passe.");
        alert("Erreur lors de la création du mot de passe.");
        setIsLoading(false);


      } else {
        setMessage("Mot de passe créé avec succès !");
        alert("Mot de passe créé avec succès !");
        setIsLoading(false);
        router.push('/');
      }
    } catch (err) {
      setMessage("Une erreur inattendue s'est produite.");
      setIsLoading(false);

    } finally {
      setIsLoading(false);
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
   
     <section className=" sm:w-full h-screen overflow-hidden bg-[#36a37b] flex justify-center items-center lg:justify-evenly lg:py-6">
     <div className="flex flex-col bg-[#3f3d56] rounded-xl space-y-2 p-6 lg:p-50 my-4 lg:my-0">
     <div className="text-center text-white">

          <div className="w-full text-center font-bold text-2xl border-b border-solid p-6 font-quick">Creer mot de passe</div>

          <div className='pt-4 pb-8 text-center font-bold'>
            Plateforme de vote de l'AMEES
          </div>
        </div>
        <form  onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="relative flex flex-col items-center space-y-2">
            <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
            <input type={type}
               placeholder="Mot de passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             className="rounded-lg bg-[#F5F5F5]  h-16 w-80 px-20 text-[#3f3d56] font-bold placeholder-slate-400 placeholder-text-lg placeholder:font-bold placeholder:font-quick" />
             <span className='absolute p-1 w-fit rounded-full h-fit top-1/4 right-4 cursor-pointer hover:bg-slate-500'  onClick={handleToggle}>
                {type === 'password' ? <AiOutlineEyeInvisible size={28} /> : <AiOutlineEye size={28} />}
              </span>

        </div>
        <div className="relative flex flex-col items-center space-y-2">
            <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
            <input type={typeC}
               placeholder="Confirmer mot de passe" 
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
             className="rounded-lg bg-[#F5F5F5]  h-16 w-80 px-20 text-[#3f3d56] font-bold placeholder-slate-400 placeholder-text-lg placeholder:font-bold placeholder:font-quick" />
             <span className='absolute p-1 w-fit rounded-full h-fit top-1/4 right-4 cursor-pointer hover:bg-slate-500'  onClick={handleToggleConfirmP}>
                {typeC === 'password' ? <AiOutlineEyeInvisible size={28} /> : <AiOutlineEye size={28} />}
              </span>

        </div>
        
        <button disabled={password!=confirmPassword} type="submit" className="btn h-16 w-80 bg-[#50c59a] font-bold rounded-lg text-white text-base font-quick">Creer</button>

        <div className="w-full flex justify-center space-x-1">
         <div className="mb-4 font-bold text-white text-base text-center ">
            Creer votre mot de passe
          </div> 
           
        </div>
   
       
</form>
 </div> 
    <img src="/undraw_voting_nvu7.svg" alt="" className="hidden  lg:block" />
    </section>
   
  );
}
