import { createPage } from "../page/utils.js"

export function createGamesPage(juegos) {
    let html = `
    <a href="/juegos/nuevo" class="btn btn-primary" >Nuevo Juego</a>
    <table class="table" >
        <thead>
            <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Plataforma</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>`
    juegos.forEach(juego => {
        html += `
            <tr>
                <td>${juego.appid}</td>
                <td>${juego.name}</td>
                <td>${juego.platforms.replaceAll(";", " ")}</td>
                <td>$${juego.price}</td>
                <td>
                    <a href="/juegos/${juego.appid}" >Ver</a>
                </td>
            </tr>
            `
    });
    html += `</tbody></table>`
    return createPage("Juegos", html)
}

export function pageError(titulo, error) {
    return createPage(titulo, error)
}

export function createDetailPage(juego) {

    let html = ``
    html += `<p>Desarrollado: ${juego.developer}</p>`
    html += `<p>Publicado: ${juego.publisher}</p>`
    html += `<p>Plataforma: ${juego.platforms}</p>`
    html += `<p>Categorias: ${juego.categories}</p>`
    html += `<p>Genero: ${juego.genres}</p>`
    html += `<p>Precio: ${juego.price}</p>`
    html += `<a href="/juegos" >Volver</a>`

    return createPage(juego.name, html)
}

export function newGameForm() {
    let html = `<form action="" method="POST" >`
    html += `
    <div class="mt-2" >
        <label class="form-label" >Nombre: </label>
        <input class="form-control" type="text" name="name" />
    </div>
    `
    html += `
    <div class="mt-2" >
        <label class="form-label" >Desarrollado: </label>
        <input class="form-control" type="text" name="developer" />
    </div>
    `
    html += `
    <div class="mt-2" >
        <label class="form-label" >Publicado: </label>
        <input class="form-control" type="text" name="publisher" />
    </div>
    `
    html += `
    <div class="mt-2" >
        <label class="form-label" >Plataforma: </label>
        <input class="form-control" type="text" name="platforms" placeholder="Si son mas de una separar con ;" />
    </div>
    `
    html += `
    <div class="mt-2" >
        <label class="form-label" >Categorias: </label>
        <input class="form-control" type="text" name="categories" />
    </div>
    `
    html += `
    <div class="mt-2" >
        <label class="form-label" >Genero: </label>
        <input class="form-control" type="text" name="genres" />
    </div>
    `
    html += `
    <div class="mt-2" >
        <label class="form-label" >Precio: </label>
        <input class="form-control" type="number" name="price" />
    </div>
    `
    html += "<button type='submit' class='btn btn-primary'>Guardar</button>"
    html += "</form>"
    html += `<a href="/juegos" >Volver</a>`

    return createPage("Nuevo Juego", html)
}