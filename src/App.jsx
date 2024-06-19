import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import About from './screens/About'
import Profile from './screens/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/signin' element = {<Signin/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/profile' element = {<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
