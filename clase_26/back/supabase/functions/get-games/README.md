# Edge Function: obtener juegos

`GET /functions/v1/get-games` consulta la coleccion `dwt4ap.juegos` de MongoDB.
Acepta los filtros `page`, `limit`, `genres`, `min_positive_ratings`,
`max_positive_ratings` y `name`. Devuelve el mismo arreglo y objeto final de
paginacion que `GET /api/juegos`. Los valores numericos invalidos reciben 400.

La funcion requiere el JWT propio de la API en `Authorization`, con o sin el
prefijo `Bearer`. No acepta automaticamente tokens de Supabase Auth. Mantiene
la verificacion del JWT dentro de la funcion: el gateway de Supabase debe
desplegarse con `--no-verify-jwt`, ya que el JWT de la API no es de Supabase.

## Despliegue

Desde `back`, con la CLI de Supabase instalada y autenticada:

1. Configurar en los secretos del proyecto `MONGO_URI` con la URI de MongoDB y
   `API_JWT_SECRET` con la misma clave usada para firmar los JWT de la API.
   Configurarlos mediante el panel de Supabase o un archivo local protegido;
   no incluirlos en el repositorio.
2. Ejecutar:

   ```sh
   supabase functions deploy get-games --remote=dnqgioqkolurocndhvsh --no-verify-jwt --use-api
   ```

3. Enviar una solicitud GET con `Authorization: Bearer <JWT de la API>`.
   Para acceso desde el navegador, incluir tambien `apikey` con la clave
   publicable del proyecto.

Las pruebas locales del manejador se ejecutan desde `back` con
`node --test supabase/functions/get-games/handler.test.mjs`.
