import { useEffect, useState } from "react"
import { useApiUsuarios } from "../../services/usuarios.services"
import { Bounce, toast } from "react-toastify"

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [nuevoRol, setNuevoRol] = useState([])
    const { getUsuarios, asignarRol, reset } = useApiUsuarios()

    useEffect(() => {
        getUsuarios()
            .then(usuarios => setUsuarios(usuarios))
            .catch(err => console.log(err))
    }, [])

    const handleAsignar = (usuario) => {
        asignarRol({ usuario, rol: nuevoRol })
            .then((usuario) => {
                toast.success('Asignado correctamente', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(err => {
                toast.error('No se pudo asignar', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }

    const handleReset = (usuario) => {
        reset(usuario)
            .then((usuario) => {
                toast.success('Asignado correctamente', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(err => {
                toast.error('No se pudo asignar', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }

    return (
        <div>
            <h1 className='text-2xl' >Listado de usuarios</h1>
            <table className='w-full mt-3' >
                <thead className='bg-gray-300' >
                    <tr>
                        <th className='p-3 text-lg' >#</th>
                        <th className='p-3 text-lg' >Nombre</th>
                        <th className='p-3 text-lg' >Nombre de usuario</th>
                        <th className='p-3 text-lg' >Email</th>
                        <th className='p-3 text-lg' >Rol</th>
                        <th className='p-3 text-lg' >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario => (
                            <tr key={usuario._id} >
                                <td>{usuario._id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <select onChange={(e) => setNuevoRol(e.target.value)} defaultValue={usuario?.rol ?? "user"}>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                        <option value="superadmin">superadmin</option>
                                    </select>
                                    <button onClick={() => handleAsignar(usuario)} >Asignar</button>
                                </td>
                                <td><button onClick={() => handleReset(usuario)} >Reset</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}