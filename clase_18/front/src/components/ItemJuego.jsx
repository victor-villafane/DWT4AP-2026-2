import { Link } from 'react-router'

export default function ItemJuego({ juego }) {
    return (
        <tr className='bg-gray-100' >
            <td className='p-3 text-md' >{juego._id}</td>
            <td className='p-3 text-md' >{juego.name}</td>
            <td className='p-3 text-md' >{juego?.platforms?.replace(/;/g, " ")}</td>
            <td className='p-3 text-md' >${juego.price}</td>
            <td>
                <Link to={`/juegos/${juego._id}`} >Ver</Link>
            </td>
        </tr>
    )
}
