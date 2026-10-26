import { useState, useEffect } from 'react'
import ItemFake from '../../components/ItemFake'
import TableError from '../../components/TableError'
import ItemJuego from '../../components/ItemJuego'
import { Link } from 'react-router'
import { call } from '../../services/api.services'

export default function Juegos() {

  const [juegos, setJuegos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    call("/juegos", "GET")
      .then(juegosApi => {
        const info = juegosApi.pop()
        setJuegos(juegosApi)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  let contenido = ""
  if (loading) contenido = [1, 2, 3, 4].map(fila => <ItemFake key={fila} /> )
  if (!loading && juegos.length > 0)
    contenido = juegos.map(juego => <ItemJuego key={juego._id} juego={juego} /> )
  else {
    contenido = <TableError />
  }
  return (
    <div>
      <h1 className='text-2xl' >Listado de juegos</h1>
      <div>
        <Link to="/nuevo-juego" >Nuevo Juego</Link>
      </div>
      <table className='w-full mt-3' >
        <thead className='bg-gray-300' >
          <tr>
            <th className='p-3 text-lg' >#</th>
            <th className='p-3 text-lg' >Nombre</th>
            <th className='p-3 text-lg' >Plataforma</th>
            <th className='p-3 text-lg' >Precio</th>
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
