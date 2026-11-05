import { useEffect } from "react"
import { supabase } from "../services/supabase.service"

export default function AuthGoogle(){
    
    const loginGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        if( error ) console.log(error)
    }

    return (
        <div onClick={ loginGoogle } >Google</div>
    )
}