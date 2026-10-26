# 1. La url no hace referencia a la accion sino al recurso

    /juegos/nuevo ----> X
            ----------> /juegos POST

    /juegos/editar/:id -> X
            ---------> /juegos PUT/PATCH

    URL: Uniform Resource Locator
    URI: Uniform Resource Identifier

# 2. USO DE LOS VERBOS HTTP

    GET         -> obtener
    POST        -> crear
    PUT         -> reemplazar
    PATCH       -> actualizar
    DELETE      -> borrar

# 3. USAMOS JSON COMO FORMATO DE INTERCAMBIO DE DATOS

# 4. ESTADOS DE RESPUESTA

    1xx: Informacion
    2xx: OK
    3xx: Redireccion
    4xx: Errores del cliente
    5xx: Errores del servidor 

https://aws.amazon.com/es/what-is/restful-api/