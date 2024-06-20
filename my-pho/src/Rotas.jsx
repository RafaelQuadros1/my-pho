import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/Home'
import Logins from './paginas/Logins'
import Singups from './paginas/Singups'

const Rotas = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Logins' element={<Logins/>}></Route>
      <Route path='/Singups' element={<Singups/>}></Route>
    </Routes>
  </Router>
  )
}

export default Rotas