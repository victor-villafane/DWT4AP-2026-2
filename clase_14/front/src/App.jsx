import { useState } from "react"

export default function App() {
  //----------------------------------
  const mensaje = "Hola!"
  // const personajes = ["Homero", "Marge", "Bart", "Lisa", "Maggie"]
  const [personajes, setPersonajes] = useState(["Homero", "Marge", "Bart", "Lisa", "Maggie"])
  // const [variable, setVariable] = useState(0)
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")

  const handleSumar = () => {
    // setVariable(variable + 1)
    // variable++
    // personajes.push(nombre)
    // const personajesCopia = [...personajes]
    // personajesCopia.push(nombre)
    setPersonajes([...personajes, nombre])
    console.log("Sumar", personajes)
  }
  const handleChange = (event) => {
    setNombre(event.target.value)
    setError("")
    if (event.target.value.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres")
    }
  }
  const handleBorrar = (indice) => {
    console.log("borrar", indice)
    // const personajesCopia = [...personajes]
    // personajesCopia.splice(indice, 1)
    setPersonajes(personajes.filter((personaje, index) => index != indice))
    console.log(personajes)
  }
  //----------------------------------
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md space-y-4" >
      <div className="flex gap-2" >
        <input
          className="flex-1 border rounded-lg px-3 py-1.5 focus:outline-blue-300"
          type="text"
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-300"
          onClick={handleSumar}>
          +
        </button>
      </div>
      {/* v-if https://es.react.dev/learn/conditional-rendering */}
      { error.length != 0 && <span className="my-3 text-red-500" >{error}</span>}
      {/* Activity */}
      {/* {variable} */}
      {/* Listado de personajes */}
      <div className="space-y-2" >
        {
          //v-for="(personaje, indice) in personajes"
          //https://es.react.dev/learn/rendering-lists
          personajes.map(
            (personaje, indice) =>
              <p
                className="`p-3 px-2 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-600 flex justify-between items-center"
                key={indice}
              >
                <span>{personaje}</span>
                <span className="cursor-pointer" onClick={() => handleBorrar(indice)} >x</span>
              </p>
          )
        }
      </div>
    </div>
  )
}
