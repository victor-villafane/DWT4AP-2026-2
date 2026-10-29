export function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:2026/api"
    return fetch(url + uri, {
        headers: {
            "authorization": JSON.parse(localStorage.getItem("usuario"))?.token,
            "Content-Type": "application/json"
        },
        method: method,
        body: JSON.stringify(body)
    })
        .then(res => {
            if(!res.ok) throw new Error()
            else return res.json()
        })
}