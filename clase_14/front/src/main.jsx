import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Fetch from './Fetch'
import FetchRealTimeGeo from './FetchRealTimeGeo'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchRealTimeGeo />
  </StrictMode>,
)
