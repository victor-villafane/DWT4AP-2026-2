import { useEffect } from "react"
import { supabase } from "../services/supabase.service"

export default function AuthNotion(){
    
    const loginNotion = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "notion",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        if( error ) console.log(error)
    }

    return (
        <div onClick={ loginNotion } >Notion</div>
    )
}