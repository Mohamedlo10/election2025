//Tinstitut
export type Candidat = {
   id: string; 
   nom: string; 
   prenom: string; 
   count: string;  
   logo:string;
   departement:string
 };
 
 export interface Admin {
  id: string; 
  aud: string;
  role: string;
  email: string; 
  phone?: string; 
  is_anonymous: boolean;
  last_sign_in_at?: string; 
  confirmed_at: string | null; 
  created_at: string; 
  updated_at: string; 
  email_confirmed_at: string | null; 
  user_metadata: {
    email: string;
    firstname?: string; 
    lastname?: string; 
    logo?:string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  app_metadata: {
    provider: string;
    providers: string[];
  };
  identities: {
    identity_id: string; 
    id: string; 
    user_id: string; 
    provider: string;
    created_at: string; 
    updated_at: string; 
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
    };
  }[];
}