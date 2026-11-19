const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
}

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
}

function integerParam(params, name, defaultValue, minimum) {
    const value = params.get(name)
    if (value === null || value === "") return defaultValue
    if (!/^\d+$/.test(value)) throw new RangeError(`Parametro invalido: ${name}`)
    const number = Number(value)
    if (!Number.isSafeInteger(number) || number < minimum) {
        throw new RangeError(`Parametro invalido: ${name}`)
    }
    return number
}

export function createHandler({ verifyToken, getCollection }) {
    return async function handler(req) {
        if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
        if (req.method !== "GET") return json({ message: "Metodo no permitido" }, 405)

        const authorization = req.headers.get("authorization")
        if (!authorization) return json({ message: "Usuario no autorizado" }, 401)

        try {
            await verifyToken(authorization.replace(/^Bearer\s+/i, ""))
        } catch (error) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" || error.name === "NotBeforeError") {
                return json({ message: "Usuario no autorizado" }, 401)
            }
            console.error("Error al verificar el token:", error.name)
            return json({ message: "Error interno del servidor" }, 503)
        }

        const params = new URL(req.url).searchParams
        let page, limit, minRatings, maxRatings
        try {
            page = integerParam(params, "page", 1, 1)
            limit = integerParam(params, "limit", 10, 1)
            minRatings = integerParam(params, "min_positive_ratings", undefined, 0)
            maxRatings = integerParam(params, "max_positive_ratings", undefined, 0)
            if (!Number.isSafeInteger((page - 1) * limit)) throw new RangeError("Paginacion invalida")
        } catch (error) {
            if (error instanceof RangeError) return json({ message: error.message }, 400)
            throw error
        }

        const filter = { eliminado: { $ne: true } }
        if (params.get("genres")) filter.genres = { $regex: params.get("genres"), $options: "i" }
        if (minRatings !== undefined) filter.positive_ratings = { $gte: minRatings }
        if (maxRatings !== undefined) {
            filter.positive_ratings = { ...filter.positive_ratings, $lte: maxRatings }
        }
        if (params.get("name")) filter.$text = { $search: params.get("name") }

        try {
            const collection = getCollection()
            const total = await collection.countDocuments(filter)
            const juegos = await collection.find(filter).skip((page - 1) * limit).limit(limit).toArray()
            juegos.push({ totalDocumentos: total, totalPaginas: Math.ceil(total / limit), currentPage: page, total: 10 })
            return json(juegos)
        } catch (error) {
            console.error("Error al obtener juegos:", error.name)
            return json({ message: "Error interno del servidor" }, 503)
        }
    }
}
