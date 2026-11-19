import { MongoClient } from "npm:mongodb@6.20.0"
import jwt from "npm:jsonwebtoken@9.0.3"
import { createHandler } from "./handler.mjs"

const mongoUri = "mongodb+srv://admin:admin@dwt4ap.agyd9lv.mongodb.net/?appName=dwt4ap"
const jwtSecret = "Clave secreta"
const client = mongoUri ? new MongoClient(mongoUri) : null

Deno.serve(createHandler({
    verifyToken(token: string) {
        if (!jwtSecret) throw new Error("Falta configurar API_JWT_SECRET")
        jwt.verify(token, jwtSecret)
    },
    getCollection() {
        if (!client) throw new Error("Falta configurar MONGO_URI")
        return client.db("dwt4ap").collection("juegos")
    },
}))
