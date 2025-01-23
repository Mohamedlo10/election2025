import { createClient } from "@/lib/supabaseClient";
import { Resend } from "resend";

const supabase = createClient();

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const passwordRandom = generateRandomPassword();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: passwordRandom,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Votre mot de passe',
      html: `<p>Voici votre mot de passe : <strong>${passwordRandom}</strong></p>`,
    });

    return res.status(200).json({ data, error: null });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}


const generateRandomPassword = () => {
  const charset = '0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {  
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};
