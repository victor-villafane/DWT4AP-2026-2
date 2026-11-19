import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwt4ap.agyd9lv.mongodb.net/?appName=dwt4ap"
const client = new MongoClient(MONGO_URI)
const db = client.db("dwt4ap")

export async function getSkills(filtros = {}) {
    const filter = {}
    const page = parseInt(filtros.page) || 1
    const limit = parseInt(filtros.limit) || 10
    const skip = (page - 1) * limit

    if (filtros?.type) filter.type = filtros.type
    if (filtros?.name) filter.name = { $regex: filtros.name, $options: "i" }

    const total = await db.collection("skills").countDocuments(filter)
    const skills = await db.collection("skills").find(filter).skip(skip).limit(limit).toArray()
    const totalPaginas = Math.ceil(total / limit)
    skills.push({ totalDocumentos: total, totalPaginas, currentPage: page, total: limit })
    return skills
}

export async function getSkillById(id) {
    const skill = await db.collection("skills").findOne({ _id: new ObjectId(id) })
    return skill
}

export async function saveSkill(skill) {
    await db.collection("skills").insertOne(skill)
    return skill
}

export async function replaceSkill(skill, id) {
    await db.collection("skills").replaceOne(
        { _id: new ObjectId(id) },
        skill
    )
    return { _id: id, ...skill }
}

export async function updateSkill(skill, id) {
    await db.collection("skills").updateOne(
        { _id: new ObjectId(id) },
        { $set: skill }
    )
    return skill
}

export async function deleteSkill(id) {
    const skill = await getSkillById(id)
    await db.collection("skills").deleteOne({ _id: new ObjectId(id) })
    return skill
}
