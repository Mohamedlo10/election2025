'use client'
import { createClient } from '@/lib/supabaseClient';
import { CalendarClock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CSSProperties, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
  const [emailIns, setemailIns] = useState('');
  const [passwordIns, setpasswordIns] = useState('');
  
  const [confirmPassword, setconfirmPassword] = useState('');
  const [envoyer, setEnvoyer] = useState(false);
  const [inscription, setinscription] = useState(false);
  const [password, setPassword] = useState('');
  const [color] = useState("#ffffff");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState(<AiOutlineEyeInvisible />);
  const [type, setType] = useState('password');
  const [typeC, setTypeC] = useState('password');


  const handleToggle = () => {
    if (type === "password") {
      setIcon(<AiOutlineEye />);
      setType("text");
    } else {
      setIcon(<AiOutlineEyeInvisible />);
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
  const handleNaviagetion=()=>{
      setinscription(false)
      setEnvoyer(false)
  }

 /*  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("inscription")

    try {
      // Vérifiez si l'email existe dans la table des votants
      const { exists, error: verifyError } = await verifyVoterEmail(emailIns);
      if (verifyError) {
        setMessage("Erreur lors de la vérification de l'email. Reessayer d'envoyer un mail");
        setinscription(false)
        setEnvoyer(false)
        setpasswordIns('')
        setconfirmPassword('')
        setemailIns('')
        return;
      }
      if (!exists) {
        setMessage("Votre email n'est pas autorisé à s'inscrire.");
        return;
      }

      const { data  } = await sendSignupEmail(emailIns,passwordIns);
      if (!data) {
        setMessage("Erreur lors de l'envoi de l'email de confirmation.");
      } else {
        setMessage("Un email de confirmation a été envoyé. Veuillez vérifier votre boîte mail.");
        alert('Inscription reussit veuillez vous connecter')
        setEnvoyer(true);

      }
    } catch (err) {
      setMessage("Une erreur inattendue s'est produite.");
    } finally {
      setIsLoading(false);
    }
  }; */
  
   const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("login")
  
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
  
      const { data, error } = await userConnection(email,password);
      if (error) {
        console.error(error.message);
        alert("email ou mot de passe incorrecte");
      } else if (data) {
        localStorage.setItem("user_session", JSON.stringify(data.user));
        router.push('accueil');
        //a faire
      }
    } catch (err: any) {
      console.error(err.message || "An unexpected error occurred.");
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

  }, []);
  

 useEffect(() => {
  const storedMAil = (document.getElementById('email') as HTMLInputElement)?.value;
  // router.push('/accueil');
  const storedPassword = (document.getElementById('password') as HTMLInputElement)?.value;

  if (storedPassword) setPassword(storedPassword);
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
      {!inscription?(
          <div className="w-full text-center font-bold text-2xl border-b border-solid p-6 font-quick">Connexion</div>

      ):(
        <div className="w-full text-center font-bold text-2xl border-b border-solid p-6 font-quick">Inscription</div>

      )}
          <div className='pt-4 pb-8 text-center font-bold'>
            Plateforme de vote de l'AMEES
          </div>
        </div>
        {!inscription?(<><form  onSubmit={handleLogin} className="flex flex-col space-y-6">
        <div className="relative flex flex-col items-center space-y-2">
            <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
            <input type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
             className="rounded-lg bg-[#F5F5F5]  h-16 w-80 px-20 text-[#3f3d56] font-bold placeholder-slate-400 placeholder-text-lg placeholder:font-bold placeholder:font-quick" placeholder="examples@gmail.com" />
        </div>
        <div className="relative flex flex-col items-center space-y-2">
            <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
            <input type={type}
               placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             className="rounded-lg bg-[#F5F5F5]  h-16 w-80 px-20 text-[#3f3d56] font-bold placeholder-slate-400 placeholder-text-lg placeholder:font-bold placeholder:font-quick" />
             <span className='absolute p-1 w-fit rounded-full h-fit top-1/4 right-4 cursor-pointer hover:bg-slate-500'  onClick={handleToggle}>
                {type === 'password' ? <AiOutlineEyeInvisible size={28} /> : <AiOutlineEye size={28} />}
              </span>

        </div>
        
        <button type="submit" className="btn h-16 w-80 bg-[#50c59a] font-bold rounded-lg text-white text-base font-quick">Connexion</button>

        <div className="w-full flex justify-center space-x-1">
         <div className="mb-4 font-bold text-white text-base text-center ">
            Vous avez pas de compte ?{" "}
            <div onClick={()=>setinscription(true)} className="underline cursor-pointer">
              S'inscrire
            </div>
          </div> 
           
        </div>
    </form></>):(<>
      {/* onSubmit={handleSignup} */}
      {!envoyer?(
        <form   className="flex flex-col space-y-6">
        <div className="relative flex flex-col items-center space-y-2">
        <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
        <input type="email"
        value={emailIns}
        onChange={(e) => setemailIns(e.target.value)}
        required
         className="rounded-lg bg-[#F5F5F5]  h-16 w-80 px-20 text-[#3f3d56] font-bold placeholder-slate-400 placeholder-text-lg placeholder:font-bold placeholder:font-quick" placeholder="examples@gmail.com" />
        </div>
        <div className="relative flex flex-col items-center space-y-2">
            <img src="/undraw_voting_nvu7.svg" alt="" className="absolute w-10 h-8 top-1/3 left-4" />
            <input type={type}
               placeholder="Mot de passe" 
            value={passwordIns}
            onChange={(e) => setpasswordIns(e.target.value)}
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
        
        <button type="submit" className="btn h-16 w-80 bg-[#50c59a] font-bold rounded-lg text-white text-base font-quick">S'inscrire</button>

          <div className="w-full flex justify-center space-x-1">
          <div className="mb-4 mt-4 font-bold text-white text-base text-center ">
            Vous avez deja un compte ?{" "}
            <div onClick={()=>setinscription(false)} className="underline cursor-pointer">
              Se connecter
            </div>
          </div> 
            
          </div>

        </form>
      ):(
        <div className='flex w-full items-center gap-7 flex-col'>
        <div className='h-24 max-w-72 text-white text-center font-bold'>Un e-mail de confirmation a été envoyé à votre boîte mail. 
        Veuillez vérifier votre courrier pour valider votre compte.</div>
        <CalendarClock className='text-white' />
        <div className="mb-4 mt-4 font-bold text-white text-base text-center ">
            <div onClick={()=> handleNaviagetion()} className="underline cursor-pointer">
              Se connecter
            </div>
          </div> 
      </div>

      )

      }
       

       </>)}
 </div> 
    <img src="/undraw_voting_nvu7.svg" alt="" className="hidden  lg:block" />
    </section>
   
  );
}
