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
        <img src={logo} alt="logo" />
        <section className='login'>
        </section>
      </header>
    
    </>
  )
}

export default Header