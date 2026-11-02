import { call } from "./api.services";

export function useApiUsuarios(){
    const login = (usuario) => call("/usuarios/login", "POST", usuario)
    const register = (usuario) => call("/usuarios", "POST", usuario)
    
    const getUsuarios = () => call("/usuarios")
    const asignarRol = (payload) => call("/usuarios/asignar", "POST", payload)
    const reset = (usuario) => call("/usuarios/reset", "POST", usuario)

    return {
        login,
        register,
        getUsuarios,
        asignarRol,
        reset
    }
}