import { useEffect } from "react"
import { supabase } from "../services/supabase.service"

export default function AuthGithub(){
    
    const loginGithub = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        if( error ) console.log(error)
    }

    return (
        <div onClick={ loginGithub } >Github</div>
    )
}