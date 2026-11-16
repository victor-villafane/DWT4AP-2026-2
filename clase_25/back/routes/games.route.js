import * as gamesController from "../controllers/games.controller.js"
import { Router } from "express"

const router = Router()

router.get("/juegos", gamesController.getGames)
router.get("/juegos/nuevo", gamesController.newGameForm) // Route -> Controller -> View/Service
router.post("/juegos/nuevo", gamesController.saveGame) // Route -> Controller -> View/Service
router.get("/juegos/editar/:id", gamesController.editGameForm) // Route -> Controller -> View/Service
router.post("/juegos/editar/:id", gamesController.editGame) // Route -> Controller -> View/Service
router.get("/juegos/eliminar/:id", gamesController.deleteGameForm) // Route -> Controller -> View/Service
router.post("/juegos/eliminar/:id", gamesController.deleteGame) // Route -> Controller -> View/Service
router.get("/juegos/:id", gamesController.getGameById)

export default router