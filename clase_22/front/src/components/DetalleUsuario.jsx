import { Link } from "react-router"
import Map from "./Map"

export default function DetalleUsuario({usuario}) {
    return (
        <div>
            <h2 className="text-3xl" >Detalle usuario</h2>
            <p className="mt-3" >Nombre: {usuario?.name}</p>
            <p>Email: {usuario?.email}</p>
            <p>Telefono: {usuario?.phone}</p>
            <p>Username: {usuario?.username}</p>
            <Link to="/usuarios" >Volver</Link>

            <div className="w-0.5" >
                <Map lat="51.505" log="-0.09" />
            </div>
        </div>)
}