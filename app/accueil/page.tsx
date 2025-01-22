"use client";
import { Candidat } from "@/interface/type";
import { createClient } from "@/lib/supabaseClient";
import { Building, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { getCandidates, incrementVote } from "../api/auth/query";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red", 
  };
export default function Page() {
  const [candidates, setCandidates] = useState<Candidat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [color, setColor] = useState("#ffffff");
  const router = useRouter();
  const supabase = createClient();
  const [selectedPayment, setSelectedPayment] = useState("");

  const [formCandidat, setformCandidat] = useState({

    idCandidat:"",

  })
  const handleCandidatSelect = (idCandidat:string) => {
    setSelectedPayment(idCandidat);
    setformCandidat((prevData) => ({
      ...prevData,
      idCandidat: idCandidat,
    }))
  };
  async function fetchCandidates() {
    const user = supabase.auth.getSession();
    console.log(user)
    if (!user) {
    setIsLoading(false)
      alert("Vous n'etes pas connecter!");
      router.push("/");
      return;
    }
    const data:any= await getCandidates();
    if (error) {
      setError(error);
    } else {
      setCandidates(data);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    
    fetchCandidates();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
        if(formCandidat?.idCandidat!="")
        {
            handleVote(formCandidat.idCandidat)
        }  
        else{
            alert("selectionnez un candidat d'abord")
        }

}

  const handleVote = async (candidateId:string) => {
    setIsLoading(true)
    const userId = (await supabase.auth.getSession()).data.session?.user.id;
    console.log(userId)
    if (!userId) {
    setIsLoading(false)
      alert("Vous n'etes pas connecter!");
      router.push("/");
      return;
    }
    const { error } = await incrementVote(candidateId, userId);
    if (error) {
    setIsLoading(false)

      alert(error);
    } else {
    setIsLoading(false)
      alert("Vote successful!");
      fetchCandidates();
      router.refresh();
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
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full sm:h-[70vh]  h-[84vh] mb-40 items-center justify-center flex flex-col">
      
      <div className="flex w-full text-center flex-col  space-y-8">
   
            <div className="flex flex-col sm:flex-row sm:mt-0 mt-14 w-full items-center justify-center lg:space-x-8">
                {candidates.map((candidate) => (
                <div
                key={candidate.id}
                onClick={() => handleCandidatSelect(candidate.id)}
                className={`lg:p-4 cursor-pointer  w-[50vw] h-[34vh] lg:w-[30vw] lg:h-[35vh] shadow-2xl m-4 flex lg:flex-row flex-col items-center justify-center rounded-lg ${
                selectedPayment === candidate.id ? "border-2  bg-[#44ce9b]" : "border-2 "
                }`}
                >
                <div className="md:size-64 size-36 rounded-md flex items-center justify-center lg:px-2 py-1 border-gray-500">
                <img className="lg:size-full size-32  object-cover" src={candidate.logo} width={400} height={400} alt={candidate.prenom+' '+candidate.nom} />
                </div>
                <div className="text-center p-2 text-[#23213d]">
                <p className="lg:font-extrabold font-bold text-sm lg:text-lg">
                    {candidate.prenom} {candidate.nom} 
                    </p>
                    <div className="lg:font-extrabold flex flex-row gap-4 mt-3 font-bold text-sm lg:text-lg">
                   {/* Votes: {candidate.count} */}
                   <Building />{candidate.departement}
                    </div>
                    <div className="lg:font-extrabold flex flex-row gap-4 mt-2 font-bold text-sm lg:text-lg">
                    <GraduationCap />{candidate.promo}
                    </div>
                </div>
                   
                </div>
                ))}
            
            </div>
        </div>

        <button onClick={handleSubmit} className="btn p-3 mt-6 lg:mt-16 mx-4 font-quick font-bold text-base rounded-xl bg-[#329b74] hover:bg-[#3f3d56] text-white w-1/4">Voter</button>
    </div>

    
  );
}

      

/* 

  <div className="w-full h-[70vh] items-center justify-center flex flex-col bg-slate-400">
      <h1>Vote for Your Candidate</h1>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <p>
              {candidate.nom} {candidate.prenom} - Votes: {candidate.count}
            </p>
            <button onClick={() => handleVote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
*/