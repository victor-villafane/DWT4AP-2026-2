import { readFile, writeFile } from "fs/promises"

export async function getGames() {
    const juegosString = await readFile("./data/steam.json", "utf-8")
    const juegos = JSON.parse(juegosString).filter( j => j.eliminado != true )
    return juegos
}

export async function getGameById(id) {
    const juegos = await getGames()
    const juego = juegos.find(j => j.appid == id)
    return juego
}

export async function saveGame(juego) {
    const juegos = await getGames()
    juego.appid = juegos.length + 1
    juegos.push(juego)
    await writeFile("./data/steam.json", JSON.stringify(juegos), "utf-8")
    return juego
}

export async function replaceGame(juego, id) {
    const juegos = await getGames()
    let updated = false
    const juegosGuardar = juegos.map(j => {
        if (j.appid == id) {
            juego.appid = id
            updated = true
            return juego
        } else {
            return j
        }
    })
    if (!updated) return updated
    await writeFile("./data/steam.json", JSON.stringify(juegosGuardar), "utf-8")
    return juego
}

export async function updateGame(juego, id) {
    const juegos = await getGames()
    const juegoAnterior = await getGameById(id)

    juego = {
        "name": juego.name ?? juegoAnterior.name,
        "developer": juego.developer ?? juegoAnterior.developer,
        "publisher": juego.publisher ?? juegoAnterior.publisher,
        "platforms": juego.platforms ?? juegoAnterior.platforms,
        "categories": juego.categories ?? juegoAnterior.categories,
        "genres": juego.genres ?? juegoAnterior.genres
    }

    let updated = false
    const juegosGuardar = juegos.map(j => {
        if (j.appid == id) {
            juego.appid = id
            updated = true
            return juego
        } else {
            return j
        }
    })
    if (!updated) return updated
    await writeFile("./data/steam.json", JSON.stringify(juegosGuardar), "utf-8")
    return juego
}

export async function deleteGame(id) {
    const juegos = await getGames()
    let juego = false
    const juegosGuardar = juegos.filter(j => {
        if (j.appid != id) return true
        else {
            juego = j
            return false
        }
    })
    await writeFile("./data/steam.json", JSON.stringify(juegosGuardar), "utf-8")
    return juego
}

export async function deleteGameLogic(id) {
    const juegos = await getGames()
    let juego = false
    const juegosGuardar = juegos.map(j => {
        if (j.appid == id) {
            j.eliminado = true
            juego = j
        } 
        return j
    })
    await writeFile("./data/steam.json", JSON.stringify(juegosGuardar), "utf-8")
    return juego
}