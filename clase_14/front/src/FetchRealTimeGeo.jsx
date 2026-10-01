import { useEffect } from "react"
import { useState } from "react"

export default function FetchRealTimeGeo() {

    // const [dolares, setDolares] = useState([])
    const [ubicacion, setUbicacion] = useState(null)

    useEffect(() => {
        // Verifico que tengo la api disponible
        if (!navigator.geolocation) return

        //Configuraciones
        const options = {
            enableHighAccuracy: true, //Maxima precision
            timeout: 5000,            //Tiempo maximo que tiene permitido buscar la posicion
            maximumAge: 0,            //No quiero usar ubicaciones en cache
        };

        function success(pos) {
            const { latitude, longitude, accuracy } = pos.coords;
            setUbicacion({
                latitud: latitude,
                longitud: longitude,
                precision: `${accuracy} metros`,
                fecha: new Date().toLocaleDateString(),
            })
        }

        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
        }

        const watchId = navigator.geolocation.watchPosition(success, error, options);
        return () => {
            console.log("ComponentDidUnmount")
            navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    return (
        <div>
            <h1 className="text-xl" >Ubicacion</h1>
            <p>Latitud: {ubicacion?.latitud}</p>
            <p>Longitud: {ubicacion?.longitud}</p>
            <p>precision: {ubicacion?.precision}</p>
            <p>Fecha: {ubicacion?.fecha}</p>
        </div>
    )
}
