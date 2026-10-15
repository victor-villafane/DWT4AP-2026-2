import { z } from "zod"

/*
            <h2 className="text-3xl" >Detalle juego</h2>
            <p className="mt-3" >Nombre: {juego?.name}</p>
            <p>Editorial: {juego?.publisher}</p>
            <p>Plataformas: {juego?.platforms.replace(/;/g, " ")}</p>
            <p>Categorias: {juego?.categories.replace(/;/g, " ")}</p>
            <p>Genero: {juego?.genres}</p>
            <p>Precio: {juego?.price}</p>
*/
const Platform = z.enum(["mac", "linux", "windows"]);

export const juegosSchema = z.object({
    _id: z.string("El campo _id debe ser una cadena").optional(),
    name: z.string("El nombre debe ser una cadena y es obligatorio").min(3),
    publisher: z.string("El campo editor debe ser obligatorio").min(3),
    platforms: z.string("El campo plataforma es obligatorio y debe ser una cadena")
        .refine(
            (value) =>
                value.split(";").every((platform) => Platform.safeParse(platform).success),
            { message: "Usa solo mac, linux o windows, separados por ;" }
        ),
    categories: z.string("El campo plataforma es obligatorio y debe ser una cadena").min(3),
    genres: z.string("El campo genero es obligatorio y debe ser una cadena").min(3),
    price: z.number("El campo precio es obligatorio y debe ser una numero positivo").positive()
}, "No es un objeto valido")