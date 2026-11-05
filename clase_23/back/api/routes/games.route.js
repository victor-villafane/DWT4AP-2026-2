import { Router } from "express"
import * as gameController from "../controllers/games.controller.js"
import { validateGame } from "../../middlewares/Games.validate.js"
import { validateToken, validateRoles } from "../../middlewares/auth.validate.js"
const router = Router()

router.get("/api/juegos",[validateToken], gameController.getGames)
router.get("/api/juegos/:id",[validateToken], gameController.getGameById)
router.post("/api/juegos",[validateGame, validateToken, validateRoles(["admin", "superadmin"])], gameController.saveGame)
router.delete("/api/juegos/:id",[validateToken, validateRoles(["admin", "superadmin"])], gameController.deleteGame)
router.put("/api/juegos/:id",[validateToken, validateRoles(["admin", "superadmin"])], gameController.replaceGame)
router.patch("/api/juegos/:id",[validateToken, validateRoles(["admin", "superadmin"])], gameController.updateGame)
router.post("/api/juegos/:id/reviews",[validateToken], gameController.saveGameReview)

export default router