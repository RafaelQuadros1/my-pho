import React from 'react'
import './Headerlogin.css'
import { FaArrowLeftLong } from "react-icons/fa6";

function Headerlogin() {
  return (
    <div className='headerlogin'>
        <button><FaArrowLeftLong  style={{color: 'black', width: '30px', height: '30px'}}/></button>
        <h1>Login</h1>
    </div>
  )
}

export default Headerlogin
