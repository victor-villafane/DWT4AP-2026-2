import express from "express"
import { createPage } from "./page/utils.js"
import { readFile } from "fs/promises"

const app = express()

const comentarios = []

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("OK")
})

app.get("/comentario", (req, res) => {
    // query string
    let html = `    <nav>
        <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/comentario">Comentarios</a></li>
        </ul><ul>`
    comentarios.forEach(element => {
        html += "<li>" + element.nombre + "</li>"
    });
    html += "</ul>"
    res.send(createPage("Comentarios", html))
})

app.post("/comentario", (req, res) => {
    comentarios.push(req.body)
    res.send("Hola! " + req.body.nombre)
})

app.get("/juegos", async (req, res) => {
    try {
        const juegosString = await readFile("./data/juegos.json", "utf-8")
        const juegos = JSON.parse(juegosString)

        let html = `
        <nav>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/contact.html">Contact</a></li>
                <li><a href="/comentario">Comentarios</a></li>
            </ul>
        <nav>
        <ul>`
        juegos.forEach(juego => {
            html += "<li>" + juego.nombre + "</li>"
        });
        html += "</ul>"
        res.send(createPage("Juegos", html))
    } catch (error) {
        console.log(error)
        res.send( createPage(404, "Pagina no encontrada") )
    }
})


app.listen(2026, () => console.log("Funcionando..."))