import { useState, useEffect } from 'react'
import Item from '../components/Item'
import ItemFake from '../components/ItemFake'
import TableError from '../components/TableError'
import { use } from 'react'

export default function App() {

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(usuariosApi => {
        setUsuarios(usuariosApi)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  let contenido = ""
  if (loading) contenido = [1, 2, 3, 4].map(fila => <ItemFake key={fila} /> )
  if (!loading && usuarios.length > 0)
    contenido = usuarios.map(usuario => <Item setSelected={setSelected} key={usuario.id} usuario={usuario} /> )
  else {
    contenido = <TableError />
  }
  return (
    <div>
      <h1 className='text-2xl' >Usuarios</h1>
      { selected && <div>{selected.name}</div> }
      <table className='w-full mt-3' >
        <thead className='bg-gray-300' >
          <tr>
            <th className='p-3 text-lg' >#</th>
            <th className='p-3 text-lg' >Nombre</th>
            <th className='p-3 text-lg' >Usuario</th>
            <th className='p-3 text-lg' >Email</th>
            <th className='p-3 text-lg' >Telefono</th>
            <th className='p-3 text-lg' >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contenido}
        </tbody>
      </table>
    </div>
  )
}
