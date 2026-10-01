import { useEffect } from "react"
import { useState } from "react"

export default function FetchRealTime() {

    const [dolares, setDolares] = useState([])

    useEffect(() => {
        const fetchApi = () => {
            fetch("https://dolarapi.com/v1/dolares")
                .then(res => res.json())
                .then(data => setDolares(data))
                .catch(err => console.log(err))
        }
        //esto va a llamar la primera vez
        fetchApi()
        //Agrego un intervalo
        const interval = setInterval(fetchApi, 1000)
        return () => {
            console.log("ComponentDidUnmount")
            clearInterval(interval)
        }
    }, [])

    return (
        <div>
            <h1 className="text-xl" >Precio Dolar Actual</h1>
            <table className="w-full" >
                <thead className="bg-gray-100" >
                    <tr>
                        <th className="p-3 text-lg" >Nombre</th>
                        <th className="p-3 text-lg" >Compra</th>
                        <th className="p-3 text-lg" >Venta</th>
                        <th className="p-3 text-lg">Actualizacion</th>
                    </tr>
                </thead>
                <tbody>
                    {dolares.map((dolar) => (
                        <tr key={dolar.nombre} >
                            <td className="p-3 text-sm text-center"  >{dolar.nombre}</td>
                            <td className="p-3 text-sm text-center"  >{dolar.compra}</td>
                            <td className="p-3 text-sm text-center"  >{dolar.venta}</td>
                            <td className="p-3 text-sm text-center"  >{dolar.fechaActualizacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
