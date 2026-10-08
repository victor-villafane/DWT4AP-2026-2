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

const App = lazy( () => import('./pages/App.jsx') )
const Home = lazy( () => import('./pages/Home.jsx') )
const Contact = lazy( () => import('./pages/Contact.jsx') )
const Detalle = lazy( () => import('./pages/Detalle.jsx') )
const Login = lazy( () => import('./pages/Login.jsx') )

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/usuarios",
        element: <ProtectedRoute rol={["admin", "superadmin"]} element={<App />} /> 
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
        path: "/usuarios/:id",
        element: <ProtectedRoute rol={["superadmin"]} element={<Detalle />} />
      },
      {
        path: "/login",
        element: <Login />
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
