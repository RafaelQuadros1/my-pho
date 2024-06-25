import React from 'react';
import { RiMenu2Line } from "react-icons/ri";
import logo from '../assets/logo.svg';
import Profile from '../components/ProfilePicture';
import './Header_dash.css'

function Header_dash({ userName, userEmail, userType, setLoading }) {
  return (
    <>
      <header className='Header_dash'>
        <section className='menu'>
          <button><RiMenu2Line style={{ color: 'black', width: '30px', height: '30px' }} /></button>
        </section>
        <section><img src={logo} style={{ width: '30px', height: '30px' }} /></section>
        <section className='conta'>
        <Profile userName={userName} userEmail={userEmail} userType={userType} setLoading={setLoading}/>
        </section>
      </header>
      
    </>
  )
}

export default Header_dash