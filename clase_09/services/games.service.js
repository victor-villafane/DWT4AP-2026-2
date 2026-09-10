import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwt4ap.agyd9lv.mongodb.net/?appName=dwt4ap"

const client = new MongoClient(MONGO_URI) //Se conectan al cluster
const db = client.db("dwt4ap")            //Se conectan a mi db

export async function getGames(filtros = {}) {
    const filter = { eliminado: { $ne: true } } //$ne https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    // Paginado
    const page = parseInt(filtros.page) || 1
    const limit = parseInt(filtros.limit) || 10
    const skip = (page - 1) * limit
    
    // Filtro por genero
    if( filtros?.genres ) filter.genres = { $regex: filtros?.genres, $options: 'i' } //filtros?.genres https://www.mongodb.com/es/docs/manual/reference/operator/query/regex/
    
    //Filtro por positive_ratings
    if( filtros?.min_positive_ratings) filter.positive_ratings = { $gte: parseInt(filtros?.min_positive_ratings) } 
    if( filtros?.max_positive_ratings) filter.positive_ratings = { $lte: parseInt(filtros?.max_positive_ratings) } 
    if( filtros?.max_positive_ratings && filtros?.min_positive_ratings) filter.$and = [
        { positive_ratings:  { $gte: parseInt(filtros?.min_positive_ratings) }  },
        { positive_ratings: { $lte: parseInt(filtros?.max_positive_ratings) } }
    ]
    
    // Buscar por nombre
    if( filtros?.name ) filter.$text = { $search: filtros?.name } 
    
    const total = await db.collection("juegos").countDocuments(filter)
    const juegos = await db.collection("juegos").find(filter).skip(skip).limit(limit).toArray()
    const totalPaginas = Math.ceil(total / limit)
    juegos.push({ totalDocumentos: total,totalPaginas: totalPaginas  })
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