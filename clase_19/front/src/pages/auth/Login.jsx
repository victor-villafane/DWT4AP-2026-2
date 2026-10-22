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
        <div onSubmit={handleSubmit} >
            <form>
                <div>
                    <label htmlFor="">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="">Pass:</label>
                    <input type="text" name="pass" id="pass" />
                </div>
                <button type="submit" >Ingresar</button>
            </form>
        </div>
    )
}