import { call } from "./api.services";

export function useApiUsuarios(){
    const login = (usuario) => call("/usuarios/login", "POST", usuario)
    const register = (usuario) => call("/usuarios", "POST", usuario)
    
    return {
        login,
        register
    }
}