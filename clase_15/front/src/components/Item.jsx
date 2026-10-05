import React from 'react'

export default function Item({ usuario, setSelected }) {
    return (
        <tr className='bg-gray-100' >
            <td className='p-3 text-md' >{usuario.id}</td>
            <td className='p-3 text-md' >{usuario.name}</td>
            <td className='p-3 text-md' >{usuario.username}</td>
            <td className='p-3 text-md' >{usuario.email}</td>
            <td className='p-3 text-md' >{usuario.phone}</td>
            <td>
                <button onClick={ () => setSelected(usuario) } >Ver</button>
            </td>
        </tr>
    )
}
