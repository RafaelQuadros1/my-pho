import React from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import logo from '../assets/logo.svg'
import './Header_dash.css'

function Header_dash() {
  return (
    <>
      <header className='Header_dash'>
        <section className='menu'>
          <button><RiMenu2Line style={{ color: 'black', width: '30px', height: '30px' }} /></button>
        </section>
        <section><img src={ logo } style={{ width:'30px', height:'30px'   }}/></section>
        <section className='logins'>
          <button><FaUserCircle style={{ color: 'black', width: '30px', height: '40px' }} /></button>
        </section>
      </header>
      
    </>
  )
}

export default Header_dash