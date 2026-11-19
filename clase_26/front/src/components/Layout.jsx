import { Outlet } from "react-router";
import Nav from "./Nav";
import { Bounce, ToastContainer } from "react-toastify"
export default function Layout() {
  return (
    <div className='min-h-screen'>
      <Nav />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Outlet />
    </div>
  )
}
