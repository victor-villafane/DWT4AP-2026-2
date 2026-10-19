import * as userService from "../../services/users.service.js"

export async function getUsers(req, res) {
    try {
        const filtros = req.query
        const usuarios = await userService.getUsers(filtros)
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function getUserByIdReviews(req, res) {
    try {
        const id = req.params.id
        const reviews = await userService.getUserByIdReviews(id)
        res.status(200).json(reviews)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}