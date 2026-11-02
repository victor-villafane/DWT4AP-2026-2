import { juegosSchema } from "../schemas/juegos.js"

export async function validateGame(req, res, next){
    console.log("Validado")
    try {
        const juego = await juegosSchema.parseAsync(req.body)
        req.body = juego
        next()
    } catch (errors) {
        const messages = errors.issues.map( error => `${error.path.length > 0 ? error.path : "Body " }:${error?.message}` )
        res.status(400).json(messages)
    }
}