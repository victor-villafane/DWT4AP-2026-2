import { useNavigate } from "react-router"

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const email = e.target.email.value
            const pass = e.target.pass.value
    
            const res = await fetch("http://localhost:2026/api/usuarios/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ email: email, password: pass })
            })
            const usuario = await res.json()
            localStorage.setItem("usuario", JSON.stringify(usuario))
            navigate("/juegos")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div onSubmit={handleSubmit} className="min-h-screen bg-slate-50 px-4 py-10" >
            <form className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4" >
                <h1 className="text-2xl font-semibold text-slate-800" >Iniciar sesión</h1>

                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Email:</label>
                    <input type="email" name="email" id="email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                </div>
                <div className="space-y-1" >
                    <label htmlFor="" className="text-sm font-medium text-slate-700" >Pass:</label>
                    <input type="text" name="pass" id="pass" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-500" />
                </div>
                <button type="submit" className="w-full rounded-md bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700" >Ingresar</button>
            </form>
        </div>
    )
}