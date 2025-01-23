import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export const userConnection = async (telephoneMail: string, passW: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email:telephoneMail+'@gmail.com',
      password:passW,
    });
    console.log(data)
    return { data, error };
  } catch (err) {
    throw err;
  }
};


export const userDeConnection = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      document.cookie = "sb-tjlasinxumybwhrjkurv-auth-token=; Max-Age=0; path=/;";
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



export const updatePassword = async (new_password:string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ password: new_password })
    if (error) throw error;
    console.log(data)
    return { data, error };
    } catch (err) {
        throw err;
    }

};



export const updateUser = async (newEmail:string,nouveauPrenom:string, nouveauNom:string,nouveauLogo:string) => {
const { data, error } = await supabase.auth.updateUser({
  email: newEmail+'@gmail.com',
  data: {
    firstname: nouveauPrenom,
    lastname: nouveauNom,
    logo: nouveauLogo,
  },
});

if (error) {
  console.error("Erreur lors de la mise à jour :", error.message);
} else {
  console.log("Utilisateur mis à jour avec succès :", data);
}
}