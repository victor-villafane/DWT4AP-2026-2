import { readFile, writeFile } from "fs/promises"

export async function getGames() {
    const juegosString = await readFile("./data/steam.json", "utf-8")
    const juegos = JSON.parse(juegosString)
    return juegos
}

export async function getGameById(id){
    const juegos = await getGames()
    const juego = juegos.find( j => j.appid == id )
    return juego
}

export async function saveGame(juego){
    const juegos = await getGames()
    juego.appid = juegos.length + 1 
    juegos.push(juego)
    await writeFile("./data/steam.json", JSON.stringify( juegos ), "utf-8")
    return juego
}
