import jwt from "jsonwebtoken"
import { validateToken as validateTokenService } from "../services/token.service.js"
export function validateToken(req, res, next) {
    try {
        const token = req.headers.authorization
        const payload = validateTokenService(token)
        req.usuario = payload
        next()
    } catch (error) {
        res.status(401).json({ message: "Usuario no autorizado" })
    }
}

export function validateRoles(roles) {
    return (req, res, next) => {
        console.log((roles.includes(req.usuario.rol)))
        if (roles.includes(req.usuario.rol)) {
            next()
        } else {
            res.status(401).json({message: "Usuario no autorizado"})
        }
    }
}