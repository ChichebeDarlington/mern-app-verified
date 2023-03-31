import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SportsContextProvider } from './components/context/SportContext'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SportsContextProvider>
    <App />
    </SportsContextProvider>
  </React.StrictMode>,
)
