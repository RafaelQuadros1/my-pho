import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../paginas/Home'
import Logins from '../paginas/Logins'
import Singups from '../paginas/Singups'
import Dash from '../paginas/Dash'

const Rotas = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Login' element={<Logins/>}></Route>
      <Route path='/Singup' element={<Singups/>}></Route>
      <Route path='/Dash' element={<Dash/>}></Route>
    </Routes>
  </Router>
  )
}

export default Rotas