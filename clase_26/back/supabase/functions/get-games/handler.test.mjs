import assert from "node:assert/strict"
import test from "node:test"
import { createHandler } from "./handler.mjs"

function setup() {
    const calls = {}
    const collection = {
        async countDocuments(filter) {
            calls.filter = filter
            return 25
        },
        find(filter) {
            calls.findFilter = filter
            return {
                skip(value) {
                    calls.skip = value
                    return this
                },
                limit(value) {
                    calls.limit = value
                    return this
                },
                async toArray() {
                    return [{ name: "Juego" }]
                },
            }
        },
    }
    const handler = createHandler({
        verifyToken(token) {
            calls.token = token
            if (token !== "valido") {
                const error = new Error("Token invalido")
                error.name = "JsonWebTokenError"
                throw error
            }
        },
        getCollection: () => collection,
    })
    return { handler, calls }
}

test("lista juegos usando filtros y paginacion compatibles con la API", async () => {
    const { handler, calls } = setup()
    const req = new Request("http://localhost/get-games?page=2&limit=5&genres=action&min_positive_ratings=10&max_positive_ratings=100&name=test", {
        headers: { authorization: "Bearer valido" },
    })
    const res = await handler(req)
    assert.equal(res.status, 200)
    assert.equal(calls.token, "valido")
    assert.deepEqual(calls.filter, {
        eliminado: { $ne: true },
        genres: { $regex: "action", $options: "i" },
        positive_ratings: { $gte: 10, $lte: 100 },
        $text: { $search: "test" },
    })
    assert.deepEqual(calls.findFilter, calls.filter)
    assert.equal(calls.skip, 5)
    assert.equal(calls.limit, 5)
    assert.deepEqual(await res.json(), [
        { name: "Juego" },
        { totalDocumentos: 25, totalPaginas: 5, currentPage: 2, total: 10 },
    ])
})

test("rechaza tokens ausentes o invalidos antes de consultar", async () => {
    const { handler, calls } = setup()
    for (const headers of [{}, { authorization: "invalido" }]) {
        const res = await handler(new Request("http://localhost/get-games", { headers }))
        assert.equal(res.status, 401)
    }
    assert.equal(calls.filter, undefined)
})

test("acepta el token actual sin Bearer y rechaza paginacion invalida", async () => {
    const { handler, calls } = setup()
    const res = await handler(new Request("http://localhost/get-games?page=-1", {
        headers: { authorization: "valido" },
    }))
    assert.equal(res.status, 400)
    assert.equal(calls.token, "valido")
    assert.equal(calls.filter, undefined)
})

test("responde a preflight y rechaza otros metodos", async () => {
    const { handler } = setup()
    const preflight = await handler(new Request("http://localhost/get-games", { method: "OPTIONS" }))
    assert.equal(preflight.status, 204)
    assert.equal(preflight.headers.get("access-control-allow-origin"), "*")
    const post = await handler(new Request("http://localhost/get-games", { method: "POST" }))
    assert.equal(post.status, 405)
})
