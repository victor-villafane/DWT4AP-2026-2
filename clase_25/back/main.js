import express from "express"
import gamesRoutes from "./routes/games.route.js"
import gamesApiRoutes from "./api/routes/games.route.js"
import usersApiRoutes from "./api/routes/users.route.js"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import cors from "cors"
import { getGames } from "./services/games.service.js"

const app = express()

app.use(cors())

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/mcp", async (req, res) => {
    const server = new McpServer({
        name: "api-juegos",
        version: "1.0.0"
    })

    server.registerTool(
        "obtener_juegos",
        {
            description: "Lista los juegos activos",
            // inputSchema: {} -> podrian pasarle un schema con todo opcional para que sepa como filtrar
        },
        async (filtros) => {
            try {
                return {
                    content: [{type: "text", text: JSON.stringify( await getGames() )}]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [{
                        type: "text",
                        text: error.message
                    }]
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