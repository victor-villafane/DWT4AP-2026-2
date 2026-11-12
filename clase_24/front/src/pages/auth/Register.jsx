import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { usersRegisterSchema } from "../../schemas/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApiUsuarios } from "../../services/usuarios.services"
export default function Register() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm(
        { resolver: zodResolver(usersRegisterSchema), criteriaMode: "all" }
    )
    const { register: registerApi } = useApiUsuarios()
    const onSubmit = async (usuario) => {
        try {
            await registerApi(usuario)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-slate-50 px-4 py-10" >
            <form className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-sm border border-slate-200 space-y-4" >
                <h1 className="text-2xl font-semibold text-slate-800" >Crear cuenta</h1>

                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Email:</label>
                    <input type="email" {...register("email")} id="email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                    {errors.email && <div className="text-sm text-red-600" >{errors.email.message}</div>}
                </div>

                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Nombre:</label>
                    <input type="text" {...register("name")} id="name" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                    {errors.name && <div className="text-sm text-red-600" >{errors.name.message}</div>}

                </div>
                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Nombre de usuario:</label>
                    <input type="text" {...register("username")} id="username" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                    {errors.username && <div className="text-sm text-red-600" >{errors.username.message}</div>}

                </div>
                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Pass:</label>
                    <input type="text" {...register("password")} id="pass" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                    {errors.password &&
                        <div className="text-sm text-red-600" >
                            {
                                typeof errors.password.types.invalid_format == "object"
                                    ? errors.password.types.invalid_format.map((error, index) => <p key={index} >{error}</p>)
                                    : errors.password.message
                            }
                        </div>
                    }

                </div>
                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Confirmar contraseña:</label>
                    <input type="text" {...register("passwordConfirm")} id="passConfirm" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                    {errors.passwordConfirm && <div className="text-sm text-red-600" >{errors.passwordConfirm.message}</div>}

                </div>
                <button type="submit" className="w-full rounded-md bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700" >Ingresar</button>
            </form>
        </div>
    )
}