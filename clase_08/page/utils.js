export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head><body>`
    html += `<div class="container-fluid" ><h1>${title}</h1>`
    html += content
    html += `</div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body></html>`
    return html
}

export function createList(lista) {
    let html = "<ul>"
    lista.forEach(item => html += "<li> Nombre:" + item.nombre + " Nota: " + item.nota + "</li>")
    html += "</ul>"
    return html
}
// module.exports = { createPage, createList }
export default { createPage, createList }