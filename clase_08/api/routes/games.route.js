import { Router } from "express"
import * as gameController from "../controllers/games.controller.js"

const router = Router()

router.get("/api/juegos", gameController.getGames)
router.get("/api/juegos/:id", gameController.getGameById)
router.post("/api/juegos", gameController.saveGame)
router.delete("/api/juegos/:id", gameController.deleteGame)
router.put("/api/juegos/:id", gameController.replaceGame)
router.patch("/api/juegos/:id", gameController.updateGame)

export default router