import React from 'react'
import logo from '../assets/logo.svg'
import { RiMenu2Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className='header'>
        <RiMenu2Line style={{color: 'black', width: '30px', height: '30px'}}/>
        <img src={logo} alt="logo" />
        <section className='login'>
        </section>
      </header>
    
    </>
  )
}

export default Header