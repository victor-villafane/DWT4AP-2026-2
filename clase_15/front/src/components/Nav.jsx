import React from 'react'
import { Link } from 'react-router'

export default function Nav() {
    return (
        <nav className='bg-gray-100 sticky top-0 z-40 w-full flex items-center justify-between p-5' >
            <div className='flex items-center space-x-1 sm:space-x-3' >
                <Link className='px-1 py-3 text-sm font-medium text-gray-600'  to="/">home</Link>
                <Link className='px-1 py-3 text-sm font-medium text-gray-600'  to="/usuarios">usuarios</Link>
                <Link  className='px-1 py-3 text-sm font-medium text-gray-600'  to="/contact">contacto</Link>
            </div>
        </nav>
    )
}
