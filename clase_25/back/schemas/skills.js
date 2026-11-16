import { z } from "zod"

const SkillType = z.enum(["ataque", "defensa", "utilidad", "pasiva"])

export const skillsSchema = z.object({
    name: z.string("El nombre de la habilidad es obligatorio").min(3, "Mínimo 3 caracteres"),
    description: z.string("La descripción es obligatoria").min(10, "Mínimo 10 caracteres"),
    type: SkillType,
    damage: z.number("El daño debe ser un número").nonnegative("El daño no puede ser negativo").default(0),
    manaCost: z.number("El costo de mana debe ser un número").nonnegative("El costo de mana no puede ser negativo").default(0),
    cooldown: z.number("El enfriamiento debe ser un número").nonnegative("El enfriamiento no puede ser negativo").default(0),
}, "No es un objeto válido")
