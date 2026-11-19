import { Link } from "react-router"

export default function DetalleJuego({juego}) {
    return (
        <div>
            <h2 className="text-3xl" >Detalle juego</h2>
            <p className="mt-3" >Nombre: {juego?.name}</p>
            <p>Editorial: {juego?.publisher}</p>
            <p>Plataformas: {juego?.platforms?.replace(/;/g, " ")}</p>
            <p>Categorias: {juego?.categories?.replace(/;/g, " ")}</p>
            <p>Genero: {juego?.genres}</p>
            <p>Precio: {juego?.price}</p>
            <Link to="/juegos" >Volver</Link>
        </div>)
}