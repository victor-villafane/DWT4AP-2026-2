import express from "express"
import gamesRoutes from "./routes/games.route.js"
import gamesApiRoutes from "./api/routes/games.route.js"
const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(gamesRoutes)
app.use(gamesApiRoutes)

app.listen(2026, () => console.log("Funcionando... http://localhost:2026"))