import { useParams } from "react-router";
import { useEffect, useState } from "react";
import DetalleJuego from "../components/DetalleJuego";
import Loading from "../components/Loading";
import Error from "../components/Error"

export default function Detalle() {
    const { id } = useParams()
    const [juego, setJuego] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        fetch("http://localhost:2026/api/juegos/" + id)
            .then(res => res.json())
            .then(data => {
                setJuego(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    if (estado == "LOADING") return <Loading />
    if (estado == "READY") return <DetalleJuego juego={juego} />

    return <Error />
}