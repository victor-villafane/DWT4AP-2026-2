const http = require("http")

const alumnos = [
    {
        id: 1,
        nombre: "Juan Perez",
        nota: 10
    },
    {
        id: 2,
        nombre: "Pedro Perez",
        nota: 10
    },
    {
        id: 3,
        nombre: "Josefina Sosa",
        nota: 10
    },
    {
        id: 4,
        nombre: "Valentin Gutierrez",
        nota: 10
    }
]

const server = http.createServer((request, response) => {
    response.write('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">')
    response.write("<title>Bienvenido</title></head><body>")
    response.write("<h1>Mi espectacular página web!</h1>")
    switch (request.url) {
        case "/":
            response.write("Hola Bienvenido! Victor Villafañe")
            break
        case "/materia":
            response.write("Aplicaciones hibridas")
            break
        case "/alumnos":
            response.write("<ul>")
            alumnos.forEach(alumno => response.write("<li> Nombre:" + alumno.nombre +" Nota: "+alumno.nota+ "</li>"))
            response.write("</ul>")
            break
        case "/profesor":
            response.write("Profesor")
            break
        default:
            response.write("404")
            break
    }
    response.end("</body></html>")
})

server.listen(2026)