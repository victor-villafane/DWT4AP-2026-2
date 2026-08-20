// const http = require("http")
// const alumnos = require("./data/alumnos.js") //CommonJS
// const page = require("./page/utils.js")
import { createServer } from "http"
import alumnos from "./data/alumnos.js"
import { createPage, createList } from "./page/utils.js"
import { readFile } from "fs/promises"

//export default -> sin las llaves
//export -> con las llaves

const server = createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.end(createPage("Mi espectacular página web!", "Hola Bienvenido! Victor Villafañe"))
            break
        case "/materia":
            response.end(createPage("Materia", "Aplicaciones hibridas"))
            break
        case "/alumnos":
            response.end(createPage("Alumnos", createList(alumnos)))
            break
        case "/profesor":
            response.end(createPage("Profesor", "Profesor"))
            break
        case "/pagina":
            // readFile("./public/index.html", "utf-8", (err, data) => {
            //     if (err) response.end(createPage("Pagina no encontrada", "404"))
            //     else {
            //         response.end(data)
            //     }
            // })
            readFile("./public/index.html", "utf-8")
                .then((data) => response.end(data))
                .catch(() => response.end(createPage("Pagina no encontrada", "404")))
            break
        case "/style.css":
            // readFile("./public/style.css", "utf-8", (err, data) => {
            //     if (err) response.end(createPage("Pagina no encontrada", "404"))
            //     else {
            //         response.end(data)
            //     }
            // })
            readFile("./public/style.css", "utf-8")
                .then((data) => response.end(data))
                .catch(() => response.end(createPage("Pagina no encontrada", "404")))
            break
        case "/favicon.ico":
            // readFile("./public/17872559510541.png", (err, data) => response.end(data))
            readFile("./public/17872559510541.png")
                .then((data) => response.end(data))
                .catch(() => response.end(createPage("Pagina no encontrada", "404")))
            break
        case "/cualquiercosa":
            // readFile("./public/17872559510541.png", (err, data) => response.end(data))
            readFile("./public/17872559510541.png")
                .then((data) => response.end(data))
                .catch(() => response.end(createPage("Pagina no encontrada", "404")))
            break
        default:
            response.end(createPage("Pagina no encontrada", "404"))
            break
    }
})

server.listen(2026)