import express from "express"
import gamesRoutes from "./routes/games.route.js"
import gamesApiRoutes from "./api/routes/games.route.js"
import usersApiRoutes from "./api/routes/users.route.js"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import cors from "cors"
import * as gameService from "./services/games.service.js"
import { juegosSchema } from "./schemas/juegos.js"
import { z } from "zod"

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "El id debe ser un ObjectId válido")

const app = express()

app.use(cors())

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// npx modelcontextprotocol/inspector 
app.post("/mcp", async (req, res) => {
    const server = new McpServer({
        name: "api-juegos",
        version: "1.0.0"
    })

    server.registerTool(
        "obtener_juegos",
        {
            description: "Lista los juegos activos con filtros y paginación",
            inputSchema: {
                genres: z.string().optional().describe("Filtra por género"),
                min_positive_ratings: z.number().int().nonnegative().optional().describe("Calificación positiva mínima"),
                max_positive_ratings: z.number().int().nonnegative().optional().describe("Calificación positiva máxima"),
                name: z.string().optional().describe("Busca por nombre"),
                page: z.number().int().positive().optional().describe("Número de página"),
                limit: z.number().int().positive().optional().describe("Cantidad de juegos por página")
            }
        },
        async (filtros) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.getGames(filtros)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "obtener_juego",
        {
            description: "Obtiene un juego por su id",
            inputSchema: { id: objectIdSchema }
        },
        async ({ id }) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.getGameById(id)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "crear_juego",
        {
            description: "Crea un juego",
            inputSchema: juegosSchema.shape
        },
        async (juego) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.saveGame(juego)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "reemplazar_juego",
        {
            description: "Reemplaza todos los datos de un juego",
            inputSchema: { id: objectIdSchema, ...juegosSchema.shape }
        },
        async ({ id, ...juego }) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.replaceGame(juego, id)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "actualizar_juego",
        {
            description: "Actualiza parcialmente los datos de un juego",
            inputSchema: {
                id: objectIdSchema,
                name: z.string().min(3).optional(),
                publisher: z.string().min(3).optional(),
                platforms: z.string().optional(),
                categories: z.string().min(3).optional(),
                genres: z.string().min(3).optional(),
                price: z.number().nonnegative().optional()
            }
        },
        async ({ id, ...juego }) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.updateGame(juego, id)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "eliminar_juego",
        {
            description: "Marca un juego como eliminado sin borrarlo de la base de datos",
            inputSchema: { id: objectIdSchema }
        },
        async ({ id }) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.deleteGameLogic(id)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "eliminar_juego_permanentemente",
        {
            description: "Borra permanentemente un juego de la base de datos",
            inputSchema: { id: objectIdSchema }
        },
        async ({ id }) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.deleteGame(id)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    server.registerTool(
        "agregar_resena",
        {
            description: "Agrega una reseña de un usuario a un juego",
            inputSchema: {
                id: objectIdSchema,
                usuario: z.object({
                    _id: objectIdSchema,
                    nombre: z.string().min(1),
                    comentario: z.string().min(1)
                })
            }
        },
        async ({ id, usuario }) => {
            try {
                return {
                    content: [{ type: "text", text: JSON.stringify(await gameService.saveGameReview(usuario, id)) }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: error.message }]
                }
            }
        }
    )

    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
    })

    try {
        await server.connect(transport)
        await transport.handleRequest(req, res, req.body)

        res.on( "close", () => {
            transport.close()
            server.close()
        } )
    } catch (error) {
        res.status(400).json({ message: "MCP DELETE not allowed" })
    }
})

app.get("/mcp", (req, res) => {
    res.status(400).json({ message: "MCP GET not allowed" })
})

app.delete("/mcp", (req, res) => {
    res.status(400).json({ message: "MCP DELETE not allowed" })
})

app.use(gamesRoutes)
app.use(gamesApiRoutes)
app.use(usersApiRoutes)

app.listen(2026, () => console.log("Funcionando... http://localhost:2026"))