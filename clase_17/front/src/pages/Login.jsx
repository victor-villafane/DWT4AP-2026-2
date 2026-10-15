import { useNavigate } from "react-router"

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value
        if( email == "admin@admin.com" && pass == "123456" ){
            console.log("Ingresaste!")
            const usuario = {
                email: "admin@admin.com",
                rol: "admin"
            }
            localStorage.setItem("usuario", JSON.stringify(usuario))
            navigate("/usuarios")
        }else{
            console.log("Error al ingresar")
            alert("Usuario o contraseña invalidos")
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