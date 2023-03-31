import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <section className="App">
    <BrowserRouter>
    <Navbar/>
    <section className="pages">
      <Routes>
        <Route path='/' index element={<Home/>}/>
      </Routes>
    </section>
    </BrowserRouter>
    </section>
  )
}

export default App
