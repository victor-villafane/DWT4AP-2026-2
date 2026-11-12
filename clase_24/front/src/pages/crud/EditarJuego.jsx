import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { juegosSchema } from "../../schemas/juegos"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { call } from "../../services/api.services"
import { useApiJuegos } from "../../services/juegos.services"

export default function EditarJuego() {

    const { id } = useParams()
    const [juego, setJuego] = useState(null)
    const navigate = useNavigate()
    const {
        register,       //Conecta cada input con nuestro formulario
        handleSubmit,   //Valida ( usando zod ) y luego llama a nuestro onSubmit
        formState: { errors, isSubmitting },
        reset
    } = useForm(
        {
            resolver: zodResolver(juegosSchema)
        }
    )

    const { updateJuego, getJuegosById } = useApiJuegos()

    useEffect(() => {
        getJuegosById(id)
            .then(dataApi => {
                reset(dataApi)
                setJuego(dataApi)
            })
            .catch(err => console.log(err))
    }, [])

    const onSubmit = (juego) => {
        updateJuego(id, juego)
            .then(data => navigate(`/juegos/${data._id}`))
            .catch(err => console.log(err))
    }

    return juego && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-4"
            >
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Editar juego</h1>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre: </label>
                    <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('name')} />
                    {errors.name && <div className="text-red-600 text-sm" >{errors.name.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="publisher" className="text-sm font-medium text-gray-700">Editor: </label>
                    <input type="text" id="publisher" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('publisher')} />
                    {errors.publisher && <div className="text-red-600 text-sm" >{errors.publisher.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="platforms" className="text-sm font-medium text-gray-700">Plataformas: </label>
                    <input type="text" id="platforms" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('platforms')} />
                    {errors.platforms && <div className="text-red-600 text-sm" >{errors.platforms.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="categories" className="text-sm font-medium text-gray-700">Categorias: </label>
                    <input type="text" id="categories" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('categories')} />
                    {errors.categories && <div className="text-red-600 text-sm" >{errors.categories.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="genres" className="text-sm font-medium text-gray-700">Genero: </label>
                    <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('genres')} />
                    {errors.genres && <div className="text-red-600 text-sm" >{errors.genres.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="text-sm font-medium text-gray-700">Precio: </label>
                    <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('price', { valueAsNumber: true })} />
                    {errors.price && <div className="text-red-600 text-sm" >{errors.price.message}</div>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Guardar
                </button>
            </form>
        </div>
    )
}