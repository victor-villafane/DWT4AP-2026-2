// // 1. Functional Component -> rfc
// export default function App() {
//   // Logica -> script -> js
//   console.log("Hola!")
//   // Renderizado -> jsx -> No es HTML
//   return (
//     <div className="hola" >
//       hola!
//     </div>
//   )
// }
// 2. Arrow Function Component -> rafce
// const App = () => {
//   // Logica
//   console.log("Hola!")
//   // Renderizado
//   return (
//     <div>
//       Hola!
//     </div>
//   )
// }
// export default App
// 3. class component -> No se usa -> rcc
// import React from "react"
// class App extends React.Component {
//   // Metodos
//   render() {
//     // Logica
//     console.log("Hola!")
//     // Renderizado
//     return (
//       <div>
//         Hola!
//       </div>
//     )
//   }
// }
// export default App
import React from 'react'

export default function App() {
  const mensaje = "Hola!"
  const personajes = ["Homero", "Marge", "Bart", "Lisa", "Maggie"]
  return (
    <div>
      { personajes.map( (personaje, indice) => <p key={indice} > {personaje} </p> ) }
    </div>
  )
}
