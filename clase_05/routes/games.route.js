import * as gamesController from "../controllers/games.controller.js"
import { Router } from "express"

const router = Router()

router.get("/juegos", gamesController.getGames)
router.get("/juegos/nuevo", gamesController.newGameForm) // Route -> Controller -> View/Service
router.post("/juegos/nuevo", gamesController.saveGame) // Route -> Controller -> View/Service
router.get("/juegos/:id", gamesController.getGameById)

export default router