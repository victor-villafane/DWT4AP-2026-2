import { Router } from "express"
import * as mcpController from "../controllers/mcp.controller.js"

const router = Router()

router.post("/mcp", mcpController.postMcp)
router.get("/mcp", mcpController.getMcp)
router.delete("/mcp", mcpController.deleteMcp)

export default router
