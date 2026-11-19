import * as skillService from "../services/skills.service.js"

export async function getSkills(req, res) {
    try {
        const filter = req.query
        const skills = await skillService.getSkills(filter)
        res.json(skills)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener habilidades" })
    }
}

export async function getSkillById(req, res) {
    try {
        const id = req.params.id
        const skill = await skillService.getSkillById(id)
        if (!skill) return res.status(404).json({ message: "Habilidad no encontrada" })
        res.json(skill)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la habilidad" })
    }
}

export async function saveSkill(req, res) {
    try {
        const skill = await skillService.saveSkill(req.body)
        res.status(201).json(skill)
    } catch (error) {
        res.status(500).json({ message: "Error al crear la habilidad" })
    }
}

export async function replaceSkill(req, res) {
    try {
        const id = req.params.id
        const skill = await skillService.replaceSkill(req.body, id)
        res.json(skill)
    } catch (error) {
        res.status(500).json({ message: "Error al reemplazar la habilidad" })
    }
}

export async function updateSkill(req, res) {
    try {
        const id = req.params.id
        const skill = await skillService.updateSkill(req.body, id)
        res.json(skill)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la habilidad" })
    }
}

export async function deleteSkill(req, res) {
    try {
        const id = req.params.id
        const skill = await skillService.deleteSkill(id)
        res.json(skill)
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la habilidad" })
    }
}
