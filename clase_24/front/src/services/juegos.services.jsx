import { call } from "./api.services";

export function useApiJuegos() {
    const getJuegos = () => call("/juegos")
    const getJuegosById = (id) => call("/juegos/" + id)
    const createJuego = (juego) => call("/juegos", "POST", juego)
    const updateJuego = (id, juego) => call("/juegos/" + id, "PUT", juego)
    const deleteJuego = (id) => call("/juegos/" + id, "DELETE")

    return {
        getJuegos,
        getJuegosById,
        createJuego,
        updateJuego,
        deleteJuego
    }
}