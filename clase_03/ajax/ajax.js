import { Worker } from "worker_threads"

function A() {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./ajax/workers.js")
        worker.on( "message", mensaje => console.log(mensaje) )
        setTimeout(() => {
            const ok = true
            if (ok) {
                resolve("A")
            } else {
                reject(":(")
            }
        }, 2000)
    })
}
function B() {
    // for( let i = 0; i < 100000000000 ; i++ ){}
    // console.log("B")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const ok = true
            if (ok) {
                resolve("B")
            } else {
                reject(":(")
            }
        }, 2000)
    })
}
function C() {
    console.log("C")
}
function D() {
    console.log("D")
}
// A()
//     .then(mensaje => {
//         console.log(mensaje)
//         return B()
//     })
//     .then((mensaje) => console.log(mensaje))
//     .catch((err) => console.log(err))
// C()
// D()

// fetch("https://hp-api.onrender.com/api/characters")
//     .then( res => res.json() )
//     .then( data => console.log(data) )
//     .catch(err => console.log(err))
// async function getPersonajes(){
//     try {
//         const res = await fetch("https://hp-api.onrender.com/api/characters")
//         const data = await res.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }
// getPersonajes()

//Promise all
// Promise.all( [A(), B()] )
//     .then( res => console.log(res))
//     .catch( err => console.log(err))

A().then( res => console.log(res) )
B().then( res => console.log(res) )
C()
D()