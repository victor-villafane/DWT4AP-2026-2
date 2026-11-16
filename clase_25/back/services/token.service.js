import jwt from "jsonwebtoken"
const SECRET = "Clave secreta"

export function createToken(usuario) {
    const token = jwt.sign({
        email: usuario.email,
        name: usuario.name,
        username: usuario.username,
        rol: usuario.rol
    }, SECRET, { expiresIn: "2h" })
    return token
}

export function validateToken(token) {
    const payload = jwt.verify(token, SECRET)
    return payload
}