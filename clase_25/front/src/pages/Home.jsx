import React from 'react'
import { Link } from 'react-router'
import { FaGamepad, FaShieldAlt, FaUsers } from 'react-icons/fa'
import hero from '../assets/hero.png'

const caracteristicas = [
  { icono: FaGamepad, titulo: 'Catálogo de juegos', texto: 'Consulta, crea y administra juegos con su plataforma y precio.' },
  { icono: FaUsers, titulo: 'Gestión de usuarios', texto: 'Registro e inicio de sesión para acceder a las funciones según tu rol.' },
  { icono: FaShieldAlt, titulo: 'Acceso protegido', texto: 'Las rutas sensibles solo están disponibles para usuarios autorizados.' },
]

export default function Home() {
  return (
    <main>
      <section className='bg-gradient-to-r from-gray-900 to-gray-700 text-white'>
        <div className='max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10'>
          <div className='flex-1 space-y-6'>
            <p className='text-sm uppercase tracking-widest text-gray-300'>DWT4AP 2026-2</p>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
              Tu tienda de juegos, en un solo lugar
            </h1>
            <p className='text-lg text-gray-300'>
              Explora el catálogo, administra tus títulos y mantén tu cuenta segura desde una interfaz sencilla.
            </p>
            <div className='flex flex-wrap gap-3'>
              <Link to='/register' className='px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-200 transition'>
                Crear cuenta
              </Link>
              <Link to='/login' className='px-6 py-3 rounded-lg border border-white font-semibold hover:bg-white hover:text-gray-900 transition'>
                Iniciar sesión
              </Link>
            </div>
          </div>
          <img src={hero} alt='Ilustración de la portada' className='flex-1 max-w-md w-full rounded-2xl shadow-xl' />
        </div>
      </section>

      <section className='max-w-6xl mx-auto px-6 py-16'>
        <h2 className='text-3xl font-bold text-center mb-10'>¿Qué puedes hacer?</h2>
        <div className='grid gap-6 md:grid-cols-3'>
          {caracteristicas.map(({ icono: Icono, titulo, texto }) => (
            <article key={titulo} className='bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition'>
              <Icono className='text-3xl text-gray-800 mb-4' />
              <h3 className='text-xl font-semibold mb-2'>{titulo}</h3>
              <p className='text-gray-600'>{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='bg-gray-100'>
        <div className='max-w-6xl mx-auto px-6 py-14 text-center space-y-4'>
          <h2 className='text-2xl font-bold'>¿Tienes dudas o sugerencias?</h2>
          <p className='text-gray-600'>Escríbenos y te responderemos lo antes posible.</p>
          <Link to='/contact' className='inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-700 transition'>
            Ir a contacto
          </Link>
        </div>
      </section>
    </main>
  )
}
