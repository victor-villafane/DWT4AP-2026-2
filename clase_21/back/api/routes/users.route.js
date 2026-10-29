import { Router } from "express"
import * as userController from "../controllers/users.controller.js"
import { validateToken, validateRoles } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/usuarios", [validateToken, validateRoles(["user", "admin", "superadmin"])], userController.getUsers)
router.get("/api/usuarios/:id/reviews", userController.getUserByIdReviews)
router.post("/api/usuarios", userController.saveUser)
router.post("/api/usuarios/login", userController.login)
// router.delete("/api/usuarios/:id", userController.deleteUser)
// router.put("/api/usuarios/:id", userController.replaceUser)
// router.patch("/api/usuarios/:id", userController.updateUser)

export default router