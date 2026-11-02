import { usersRegisterSchema } from "../schemas/users"

export async function validateUser(req, res, next){
    console.log("Validado")
    try {
        const user = await usersRegisterSchema.parseAsync(req.body)
        req.body = user
        next()
    } catch (errors) {
        const messages = errors.issues.map( error => `${error.path}:${error?.message}` )
        res.status(400).json(messages)
    }
}