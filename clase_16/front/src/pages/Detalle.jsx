import { useParams } from "react-router";
import { useEffect, useState } from "react";
import DetalleUsuario from "../components/DetalleUsuario";
import Loading from "../components/Loading";
import Error from "../components/Error"

export default function Detalle() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/" + id)
            .then(res => res.json())
            .then(data => {
                setUsuario(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    if (estado == "LOADING") return <Loading />
    if (estado == "READY") return <DetalleUsuario usuario={usuario} />

    return <Error />
}