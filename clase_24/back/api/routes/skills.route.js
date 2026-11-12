import { Router } from "express"
import * as skillController from "../controllers/skills.controller.js"
import { validateSkill } from "../../middlewares/Skills.validate.js"
import { validateToken, validateRoles } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/skills", [validateToken], skillController.getSkills)
router.get("/api/skills/:id", [validateToken], skillController.getSkillById)
router.post("/api/skills", [validateSkill, validateToken, validateRoles(["admin", "superadmin"])], skillController.saveSkill)
router.put("/api/skills/:id", [validateSkill, validateToken, validateRoles(["admin", "superadmin"])], skillController.replaceSkill)
router.patch("/api/skills/:id", [validateToken, validateRoles(["admin", "superadmin"])], skillController.updateSkill)
router.delete("/api/skills/:id", [validateToken, validateRoles(["admin", "superadmin"])], skillController.deleteSkill)

export default router
