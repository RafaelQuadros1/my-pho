import React from 'react';
import './Headerlogin.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FaArrowLeftLong } from "react-icons/fa6";

function Headerlogin() {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate('/'); 
  };

  return (
    <div className='headerlogin'>
      <button onClick={handleBack}><FaArrowLeftLong className='voltar' style={{ color: 'black', width: '30px', height: '30px' }} /></button>
      <h1>LOGIN</h1>
    </div>
  );
}

export default Headerlogin;
