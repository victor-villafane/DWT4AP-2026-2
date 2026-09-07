import * as gameService from "../../services/games.service.js"

export async function getGames(req, res) {
    try {
        const juegos = await gameService.getGames()
        res.status(200).json(juegos)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function getGameById(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getGameById(id)
        if (juego) res.status(200).json(juego)
        else res.status(404).json({ message: "Juego no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function saveGame(req, res) {
    try {
        const juego = await gameService.saveGame(req.body)
        res.status(201).json(juego)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function deleteGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.deleteGameLogic(id)
        if (juego) res.status(202).json(juego)
        else res.status(404).json({ message: "Juego no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function replaceGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.replaceGame(req.body, id)
        if (juego) res.status(202).json(juego)
        else res.status(404).json({ message: "Juego no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function updateGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.updateGame(req.body, id)
        if (juego) res.status(202).json(juego)
        else res.status(404).json({ message: "Juego no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}