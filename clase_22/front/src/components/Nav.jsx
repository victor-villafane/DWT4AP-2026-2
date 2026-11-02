import { Activity } from 'react'
import { Link } from 'react-router'
import { useRol, useSession } from '../context/session.context'

export default function Nav() {

    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const auth = useSession()
    const rol = useRol()
    console.log(auth?.usuario?.name)
    return (
        <nav className='bg-gray-100 sticky top-0 z-40 w-full flex items-center justify-between p-5' >
            <div className='flex items-center space-x-1 sm:space-x-3' >
                <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/">home</Link>
                {usuario && <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/juegos">juegos</Link>}
                <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/contact">contacto</Link>
                <Activity mode={!auth?.usuario?.name ? "visible" : "hidden"} >
                    <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/login">Login</Link>
                    <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/register">Registro</Link>
                </Activity>
                { rol == "superadmin" && <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/usuarios">usuarios</Link> }
                { auth?.usuario?.name && <Link className='px-1 py-3 text-sm font-medium text-gray-600' to="/salir">Salir</Link> }
            </div>
            {auth?.usuario?.name}
        </nav>
    )
}
