import { createContext, useState } from "react";

export const contexto = createContext()

export function SessionProvider({children}){
    const [nombre, setNombre] = useState()
    return (
        <contexto.Provider value={{nombre: "homero"}} >
            {children}
        </contexto.Provider>
    )
}