import { Link } from 'react-router'

export default function Item({ usuario }) {
    return (
        <tr className='bg-gray-100' >
            <td className='p-3 text-md' >{usuario.id}</td>
            <td className='p-3 text-md' >{usuario.name}</td>
            <td className='p-3 text-md' >{usuario.username}</td>
            <td className='p-3 text-md' >{usuario.email}</td>
            <td className='p-3 text-md' >{usuario.phone}</td>
            <td>
                <Link to={`/usuarios/${usuario.id}`} >Ver</Link>
            </td>
        </tr>
    )
}
