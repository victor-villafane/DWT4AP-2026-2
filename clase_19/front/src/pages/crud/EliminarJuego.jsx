import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import DetalleJuego from "../../components/DetalleJuego";
import Loading from "../../components/Loading";
import Error from "../../components/Error"

export default function Eliminar() {
    const { id } = useParams()
    const [juego, setJuego] = useState(null)
    const [estado, setEstado] = useState("LOADING")
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:2026/api/juegos/" + id)
            .then(res => res.json())
            .then(data => {
                setJuego(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:2026/api/juegos/" + id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => navigate(`/juegos`))
            .catch(err => console.log(err))
    }

    if (estado == "LOADING") return <Loading />
    if (estado == "READY") return (
        <div>
            <h2 className="text-3xl" >Detalle juego</h2>
            <p className="mt-3" >Nombre: {juego?.name}</p>
            <p>Editorial: {juego?.publisher}</p>
            <p>Plataformas: {juego?.platforms?.replace(/;/g, " ")}</p>
            <p>Categorias: {juego?.categories?.replace(/;/g, " ")}</p>
            <p>Genero: {juego?.genres}</p>
            <p>Precio: {juego?.price}</p>
            <form onSubmit={handleSubmit}><button className="text-red-500" type="submit" >Eliminar</button></form>
            <Link to="/juegos" >Volver</Link>
        </div>)

    return <Error />
}