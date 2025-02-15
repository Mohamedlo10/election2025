
import { sendMail } from "@/lib/sendMails";
import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export const sendSignupEmail = async (emails: string) => {
  const passwordGenerated=generateRandomPassword()
  try {
    const { data, error } = await supabase.auth.signUp({
      email: emails,
      password: passwordGenerated,
    });
if (error) {
      throw error; // Si une erreur survient pendant l'inscription
    }
    console.log(passwordGenerated)
    const response = await sendMail({
      email:'mouhamedlo15036@gmail.com',
      sendTo: emails,
      subject: 'votre mot de passe',
      text: passwordGenerated,
    });
    console.log('Reponse de l\'envoi de l\'email',response);

    

    return { data };
  } catch (err) {
    console.error('SignUp error:', err);
    throw err; // Lancer une erreur si quelque chose se passe mal
  }
};

const generateRandomPassword = () => {
  const charset = '0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {  
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export const createPassword = async (password: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    return { data, error };
  } catch (err:any) {
    return { data: null, error: err.message };
  }
};


export const userConnection = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (err:any) {
    return { data: null, error: err.message };
  }
};

export const verifyVoterEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("votants")
      .select("email")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No match found
        return { exists: false, error: null };
      }
      throw error;
    }
    return { exists: !!data, error: null };
  } catch (err:any) {
    return { exists: false, error: err.message };
  }
};

export const userDeConnection = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/'; 
      localStorage.removeItem('user_session');


    } else {
      console.error('Erreur lors de la déconnexion', error);
    }
    return { error };
  } catch (err) {
    throw err;
  }
};

// API for managing candidates
export const getCandidates = async () => {
  try {
    const { data, error } = await supabase.from("candidats").select("*");
    if (error) throw error;
    console.log(data)
    return data;
  } catch (err:any) {
    return { data: null, error: err.message };
  }
};


export const getSCore = async () => {
  try {
    const { data, error } = await supabase.rpc('count_candidate_votes');
    if (error) throw error;
    console.log(data)
    return data;
  } catch (err:any) {
    return { data: null, error: err.message };
  }
};

export const incrementVote = async (candidateId:string, userId:string) => {
  try {
    // Check if the user has already voted
    const { data: voteRecord, error: voteError } = await supabase
      .from("votes")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (voteError && voteError.code !== "PGRST116") throw voteError; // Ignore no match errors
    if (voteRecord) return { data: null, error: "Vous avez deja vote" };

    // Increment candidate vote count via the RPC function
    const { error: rpcError } = await supabase.rpc("increment_vote_count", {
      candidate_id: candidateId,
    });

    if (rpcError) throw rpcError;

    // Record user vote
    const { error: insertError } = await supabase
      .from("votes")
      .insert({ user_id: userId, candidate_id: candidateId });

    if (insertError) throw insertError;

    return { data: true, error: null };
  } catch (err:any) {
    return { data: null, error: err.message };
  }
};
