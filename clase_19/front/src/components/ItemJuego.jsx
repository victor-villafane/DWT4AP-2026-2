import { Link } from 'react-router'

export default function ItemJuego({ juego }) {
    return (
        <tr className='bg-gray-100' >
            <td className='p-3 text-md' >{juego._id}</td>
            <td className='p-3 text-md' >{juego.name}</td>
            <td className='p-3 text-md' >{juego?.platforms?.replace(/;/g, " ")}</td>
            <td className='p-3 text-md' >${juego.price}</td>
            <td>
                <Link className='text-blue-700 mx-1' to={`/juegos/${juego._id}`} >Ver</Link>
                <Link className='text-amber-700 mx-1' to={`/editar-juego/${juego._id}`} >Editar</Link>
                <Link className='text-red-700 mx-1' to={`/eliminar-juego/${juego._id}`} >Eliminar</Link>
            </td>
        </tr>
    )
}
