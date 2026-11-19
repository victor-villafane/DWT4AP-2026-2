import { useEffect } from "react"
import { supabase } from "../services/supabase.service"
import { FcGoogle } from "react-icons/fc";

export default function AuthGoogle() {

    const loginGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        if (error) console.log(error)
    }

    return (
        <div className="flex items-center justify-center gap-2 w-full p-2 border-0 rounded-xl shadow-sm" onClick={loginGoogle} >
           <FcGoogle size={30} />
            Google
        </div>
    )
}