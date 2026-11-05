import { supabase } from "../services/supabase.service.js"

export async function validateTokenSupabase(req, res, next){
    try {
        const [ bearer, token ] = req.headers.authorization.split(" ")
        console.log(token)
        const usuario = await supabase.auth.getUser(token)
        req.usuario = {
            name: usuario.data.user.user_metadata.name,
            username: usuario.data.user.user_metadata.email,
            email: usuario.data.user.user_metadata.email,
            rol: "user"
        }
        next()
    } catch (error) {
        res.status(401).json({message: "Usuario no autorizado"})
    }
}