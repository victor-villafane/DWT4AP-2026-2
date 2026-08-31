import * as gameService from "../services/games.service.js";
import * as gameView from "../views/games.view.js"

export async function getGames(req, res) {
    try {
        const juegos = await gameService.getGames()
        res.send(gameView.createGamesPage(juegos))
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}

export async function getGameById(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getGameById(id)
        res.send(gameView.createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError(404, "Juego no encontrado"))
    }
}

export function newGameForm(req, res) {
    try {
        res.send(gameView.newGameForm())
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}

export async function saveGame(req, res) {
    console.log(req.body)
    try {
        const juego = await gameService.saveGame(req.body)
        res.send(gameView.createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}

export async function editGameForm(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getGameById(id)
        res.send(gameView.editGameForm(juego))
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}

export async function editGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.editGame(req.body, id)
        res.send(gameView.createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}

export async function deleteGameForm(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getGameById(id)
        res.send(gameView.deleteGameForm(juego))
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}

export async function deleteGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.deleteGame(id)
        res.send(gameView.createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError(404, "Pagina no encontrada"))
    }
}