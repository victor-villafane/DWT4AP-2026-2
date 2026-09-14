import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwt4ap.agyd9lv.mongodb.net/?appName=dwt4ap"

const client = new MongoClient(MONGO_URI) //Se conectan al cluster
const db = client.db("dwt4ap")            //Se conectan a mi db

export async function getUsers(filtros = {}) {
    return await db.collection("usuarios").find().toArray()
}

export async function getUserById(id){
    return await db.collection("usuarios").findOne({ _id: new ObjectId(id) })
}

export async function saveUser(usuario){
    return await db.collection("usuarios").insertOne(usuario)
}

export async function deleteUser(id){
    return await db.collection("usuarios").deleteOne(id)
}

export async function getUserByIdReviews(id){
    const usuario = getUserById(id)
    return usuario.reviews
}