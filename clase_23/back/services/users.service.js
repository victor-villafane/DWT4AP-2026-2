import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import { createToken } from "./token.service.js"

const MONGO_URI = "mongodb+srv://admin:admin@dwt4ap.agyd9lv.mongodb.net/?appName=dwt4ap"

const client = new MongoClient(MONGO_URI) //Se conectan al cluster
const db = client.db("dwt4ap")            //Se conectan a mi db

export async function getUsers(filtros = {}) {
    return await db.collection("usuarios").find().toArray()
}

export async function getUserById(id) {
    return await db.collection("usuarios").findOne({ _id: new ObjectId(id) })
}

export async function saveUser(usuario, socialLogin) {
    if (!socialLogin) {
        const existe = await db.collection("usuarios").findOne({ email: usuario.email })
        if (existe) throw new Error()
        usuario.password = await bcrypt.hash(usuario.password, 10)
        delete usuario.passwordConfirm
    }
    console.log("usuario antes de guardar", usuario)
    return await db.collection("usuarios").insertOne(usuario)
}

export async function deleteUser(id) {
    return await db.collection("usuarios").deleteOne(id)
}

export async function getUserByIdReviews(id) {
    const usuario = getUserById(id)
    return usuario.reviews
}

export async function login(usuario, socialLogin) {
    let usuarioDB = await db.collection("usuarios").findOne({ email: usuario.email })
    console.log("usuarioDB", usuarioDB)
    if (!usuarioDB) {
        if (socialLogin) {
            await saveUser(usuario, true)
            usuarioDB = usuario
        } else {
            throw new Error()
        }
    }

    if (!socialLogin) {
        const ok = await bcrypt.compare(usuario.password, usuarioDB.password)
        if (!ok) throw new Error()
    }

    const token = createToken(usuarioDB)

    return {
        email: usuarioDB.email,
        name: usuarioDB.name,
        username: usuarioDB.username,
        rol: usuarioDB.rol,
        token: token
    }
}

export async function asignarRol(payload) {
    const usuario = payload.usuario
    const nuevoRol = payload.rol

    await db.collection("usuarios").updateOne(
        { email: usuario.email },
        { $set: { rol: nuevoRol } }
    )

    return usuario
}

export async function reset(usuario) {

    await db.collection("usuarios").updateOne(
        { email: usuario.email },
        { $set: { password: "$2b$10$n71hW2Jhz0uUFoeo.yTaCePvaurROT0Jk1SFrEKXnI6953OBCeDRS" } }
    )

    return usuario
}