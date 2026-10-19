import { z } from "zod"

export const usersRegisterSchema = z.object({
    _id: z.string("El campo _id debe ser una cadena").optional(),
    name: z.string("El nombre debe ser una cadena y es obligatorio").min(3),
    username: z.string("El nombre debe ser una cadena y es obligatorio").min(3),
    email: z.email("El campo es obligatorio y debe ser un email valido"),
    password: z.min(8, "La contraseña debe tener como minimo 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
        .regex(/[a-z]/, "La contraseña debe tener al menos una minuscula")
        .regex(/[0-9]/, "La contraseña debe tener al menos un numero")
        .regex(/[@_-#$%&/()=]/, "La contraseña debe tener al menos un simbolo @_-#$%&/()="),
    passwordConfirm: z.string("El confirmar contraseña debe ser una cadena y es obligatorio").min(8)
}, "Objeto invalido")
    .refine((data) => data.password === data.passwordConfirm, {
        error: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],
    });