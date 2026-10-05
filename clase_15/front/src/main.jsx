import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './pages/App.jsx'
// import Home from './pages/Home.jsx'
// import Contact from './pages/Contact.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Layout from './components/Layout.jsx'
const App = lazy( () => import('./pages/App.jsx') )
const Home = lazy( () => import('./pages/Home.jsx') )
const Contact = lazy( () => import('./pages/Contact.jsx') )

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/usuarios",
        element: <App />  //https://reactrouter.com/start/data/routing -> esta como Component
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
