import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import './Headersingup.css'

function Headersingup() {
  return (
    <>
    <div className='Headersingup'>
        <button><FaArrowLeftLong style={{color: 'black', width: '30px', height: '30px'}}/></button>
        <h1>Singup</h1>
    </div>
    </>
  )
}

export default Headersingup
