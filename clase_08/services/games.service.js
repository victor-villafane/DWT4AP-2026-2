import { readFile, writeFile } from "fs/promises"
import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwt4ap.agyd9lv.mongodb.net/?appName=dwt4ap"

const client = new MongoClient(MONGO_URI) //Se conectan al cluster
const db = client.db("dwt4ap")            //Se conectan a mi db

export async function getGames() {
    const juegos = await db.collection("juegos").find().toArray()
    return juegos
}

export async function getGameById(id) {
    const juego = await db.collection("juegos").findOne({ _id: new ObjectId(id) })
    return juego
}

export async function saveGame(juego) {
    await db.collection("juegos").insertOne(juego)
    return juego
}

export async function replaceGame(juego, id) {
    await db.collection("juegos").replaceOne(
        { _id: new ObjectId(id) },
        juego
    )
    return juego
}

export async function updateGame(juego, id) {
    await db.collection("juegos").updateOne(
        { _id: new ObjectId(id) },
        { $set: juego } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return juego
}

export async function deleteGame(id) {
    const juego = getGameById(id)
    await db.collection("juegos").deleteOne({ _id: new ObjectId(id) })
    return juego
}

export async function deleteGameLogic(id) {
    const juego = getGameById(id)
    await db.collection("juegos").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return juego
}