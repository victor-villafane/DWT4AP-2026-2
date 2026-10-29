import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './pages/App.jsx'
// import Home from './pages/Home.jsx'
// import Contact from './pages/Contact.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Juegos = lazy(() => import('./pages/crud/Juegos.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Detalle = lazy(() => import('./pages/Detalle.jsx'))
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const NuevoJuego = lazy(() => import('./pages/crud/NuevoJuego.jsx'))
const EditarJuego = lazy(() => import('./pages/crud/EditarJuego.jsx'))
const EliminarJuego = lazy(() => import('./pages/crud/EliminarJuego.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/juegos",
        element: <ProtectedRoute rol={["admin", "superadmin"]} element={<Juegos />} />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/juegos/:id",
        element: <ProtectedRoute rol={["superadmin","admin", "user"]} element={<Detalle />} />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },      
      {
        path: "/nuevo-juego",
        element: <ProtectedRoute rol={["superadmin", "admin"]} element={<NuevoJuego />} />
      },
      {
        path: "/editar-juego/:id",
        element: <ProtectedRoute rol={["superadmin", "admin"]} element={<EditarJuego />} />
      },
      {
        path: "/eliminar-juego/:id",
        element: <ProtectedRoute rol={["superadmin", "admin"]} element={<EliminarJuego />} />
      }      
    ]
  },
  {
    path: "/admin",
    element: <div>admin</div>
  },
  {
    path: "*",
    element: <div>404</div>
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
