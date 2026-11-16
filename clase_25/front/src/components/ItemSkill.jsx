import { Link } from 'react-router'

export default function ItemSkill({ skill }) {
    return (
        <tr className='bg-gray-100'>
            <td className='p-3 text-md'>{skill._id}</td>
            <td className='p-3 text-md'>{skill.name}</td>
            <td className='p-3 text-md'>{skill.type}</td>
            <td className='p-3 text-md'>{skill.description}</td>
            <td className='p-3 text-md'>Daño: {skill.damage} | Mana: {skill.manaCost} | CD: {skill.cooldown}s</td>
            <td>
                <Link className='text-blue-700 mx-1' to={`/skills/${skill._id}`}>Ver</Link>
                <Link className='text-amber-700 mx-1' to={`/editar-skill/${skill._id}`}>Editar</Link>
                <Link className='text-red-700 mx-1' to={`/eliminar-skill/${skill._id}`}>Eliminar</Link>
            </td>
        </tr>
    )
}
