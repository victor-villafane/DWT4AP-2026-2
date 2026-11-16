import { call } from "./api.services"

export function useApiSkills() {
    const getSkills = () => call("/skills")
    const getSkillById = (id) => call("/skills/" + id)
    const createSkill = (skill) => call("/skills", "POST", skill)
    const updateSkill = (id, skill) => call("/skills/" + id, "PUT", skill)
    const deleteSkill = (id) => call("/skills/" + id, "DELETE")

    return {
        getSkills,
        getSkillById,
        createSkill,
        updateSkill,
        deleteSkill
    }
}
