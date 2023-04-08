
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import LOGIN from './pages/Login'
import { useAuthContext } from './components/context/AuthContext'


function App() {
const {user} = useAuthContext()

  return (
    <section className="App">
    <BrowserRouter>
    <Navbar/>
    <section className="pages">
      <Routes>
        <Route path='/' index element={user? <Home/>:<Navigate to="/login"/>}/>
        <Route path='/signup' index element={!user? <Signup/>:<Navigate to="/"/>}/>
        <Route path='/login' index element={!user? <LOGIN/>:<Navigate to="/"/>}/>
      </Routes>
    </section>
    </BrowserRouter>
    </section>
  )
}

export default App
