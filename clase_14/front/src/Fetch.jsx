import { useState, useEffect } from "react"

export default function Fetch() {

    const [personajes, setPersonajes] = useState([])
    const [search, setSearch] = useState("a")
    
    useEffect(() => {
        // componentDidMount() -> Se ejecuta luego de que se renderiza nuestro componente
        console.log("ComponentDidMount")
        fetch('https://www.superheroapi.com/api.php/ae8cc92f72f9a8a66a88e3dcddc12b1a/search/a')
            .then((res) => res.json())
            .then(data => setPersonajes(data.results))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        console.log("ComponentDidUpdate")
        fetch(`https://www.superheroapi.com/api.php/ae8cc92f72f9a8a66a88e3dcddc12b1a/search/${search}`)
            .then((res) => res.json())
            .then(data => setPersonajes(data.results))
            .catch((err) => console.log(err))
    }, [search])

    return (
        <div>
            <h1 className="text-xl" >Personajes</h1>
            <input type="text" onChange={(e) => setSearch(e.target.value || "a") } />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Trabajo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personajes.map(personaje => (
                            <tr key={personaje.id} >
                                <td>{personaje?.image?.url}</td>
                                <td>{personaje?.name}</td>
                                <td>{personaje?.work?.occupation}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
