import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import About from './screens/About'
import Profile from './screens/Profile'
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./CreateListing"
import UpdataListing from "./screens/UpdataListing"
import Listing from "./screens/Listing"

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/signin' element = {<Signin/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/listing/:id' element = {<Listing/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element = {<Profile/>} />
          <Route path="/createListing" element = {<CreateListing/>} />
          <Route path="/updateListing/:id" element = {<UpdataListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
