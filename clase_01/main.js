const http = require("http")

const server = http.createServer( (request, response) => {
    // Request -> Es un obj que tiene todo lo que envia el cliente
    // Response -> Es un obj que tiene todos los atributos y metodos necesarios para contestar
    response.end("LLEGO LA SOLICITUD")
} )

server.listen(2026)