import {Navigate} from "react-router"
import { useRol, useUsuario } from "../context/session.context"

export default function ProtectedRoute({element, rol}){
    const usuario = useUsuario()
    const usuarioRol = useRol()
    if(usuario && rol.includes(usuarioRol)) return element
    if( usuario ) return <Navigate to="/" />
    return <Navigate to="/login" />
}