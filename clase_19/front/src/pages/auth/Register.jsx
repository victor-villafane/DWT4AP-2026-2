import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { usersRegisterSchema } from "../../schemas/users"
import { zodResolver } from "@hookform/resolvers/zod"
export default function Register() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm(
        { resolver: zodResolver(usersRegisterSchema), criteriaMode: "all" }
    )

    const onSubmit = async (usuario) => {
        try {
            const res = await fetch("http://localhost:2026/api/usuarios", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(usuario)
            })
            if (!res.ok) return
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div onSubmit={handleSubmit(onSubmit)} >
            <form>
                <div>
                    <label htmlFor="">Email:</label>
                    <input type="email" {...register("email")} id="email" />
                    {errors.email && <div className="text-red-600" >{errors.email.message}</div>}
                </div>
                <div>
                    <label htmlFor="">Nombre:</label>
                    <input type="text" {...register("name")} id="name" />
                    {errors.name && <div className="text-red-600" >{errors.name.message}</div>}

                </div>
                <div>
                    <label htmlFor="">Nombre de usuario:</label>
                    <input type="text" {...register("username")} id="username" />
                    {errors.username && <div className="text-red-600" >{errors.username.message}</div>}

                </div>
                <div>
                    <label htmlFor="">Pass:</label>
                    <input type="text" {...register("password")} id="pass" />
                    {errors.password &&
                        <div className="text-red-600" >
                            {
                                typeof errors.password.types.invalid_format == "object"
                                    ? errors.password.types.invalid_format.map((error, index) => <p key={index} >{error}</p>)
                                    : errors.password.message
                            }
                        </div>
                    }

                </div>
                <div>
                    <label htmlFor="">Confirmar contraseña:</label>
                    <input type="text" {...register("passwordConfirm")} id="passConfirm" />
                    {errors.passwordConfirm && <div className="text-red-600" >{errors.passwordConfirm.message}</div>}

                </div>
                <button type="submit" >Ingresar</button>
            </form>
        </div>
    )
}