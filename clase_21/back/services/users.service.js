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

export async function saveUser(usuario) {
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error()

    usuario.password = await bcrypt.hash(usuario.password, 10)
    delete usuario.passwordConfirm

    return await db.collection("usuarios").insertOne(usuario)
}

export async function deleteUser(id) {
    return await db.collection("usuarios").deleteOne(id)
}

export async function getUserByIdReviews(id) {
    const usuario = getUserById(id)
    return usuario.reviews
}

export async function login(usuario) {
    const usuarioDB = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!usuarioDB) throw new Error()
    const ok = await bcrypt.compare(usuario.password, usuarioDB.password)
    if (!ok) throw new Error()

    const token = createToken(usuarioDB)

    return {
        email: usuarioDB.email,
        name: usuarioDB.name,
        username: usuarioDB.username,
        rol: usuarioDB.rol,
        token: token
    }
}