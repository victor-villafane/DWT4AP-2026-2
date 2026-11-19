import { skillsSchema } from "../schemas/skills.js"

export async function validateSkill(req, res, next) {
    console.log("Validando skill")
    try {
        const skill = await skillsSchema.parseAsync(req.body)
        req.body = skill
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => `${error.path.length > 0 ? error.path : "Body "}:${error?.message}`)
        res.status(400).json(messages)
    }
}
