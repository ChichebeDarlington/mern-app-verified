import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SportsContextProvider } from './components/context/SportContext'
import AuthContextProvider from './components/context/AuthContext'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <SportsContextProvider>
    <App />
    </SportsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
