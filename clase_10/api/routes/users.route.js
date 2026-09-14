import { Router } from "express"
import * as userController from "../controllers/users.controller.js"

const router = Router()

router.get("/api/usuarios", userController.getUsers)
router.get("/api/usuarios/:id/reviews", userController.getUserByIdReviews)
// router.post("/api/usuarios", userController.saveUser)
// router.delete("/api/usuarios/:id", userController.deleteUser)
// router.put("/api/usuarios/:id", userController.replaceUser)
// router.patch("/api/usuarios/:id", userController.updateUser)

export default router