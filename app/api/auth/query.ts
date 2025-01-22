
import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export const sendSignupEmail = async (myeEmail: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: myeEmail,
      options: {
        emailRedirectTo: "https://election2025.vercel.app/create-password",
      },
    });
    return { data, error };
  } catch (err) {
    throw err;
  }
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
