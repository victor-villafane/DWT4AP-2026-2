import { useEffect } from "react"
import { supabase } from "../../services/supabase.service"
import { useLogin } from "../../context/session.context"
import { useNavigate } from "react-router"

export default function Callback() {

    const login = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession()
            .then(async datos => {
                const res = await fetch("http://localhost:2026/api/usuarios/social-login", {
                    headers: {
                        'authorization': "Bearer " + datos.data.session.access_token
                    },
                    method: "POST"
                })
                if (!res.ok) throw new Error()
                const usuario = await res.json()
                login(usuario)
                navigate("/")
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>

        </div>
    )
}