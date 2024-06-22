import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header_dash from '../components/Header_dash';
import Chat from '../components/Chat';
import './Dash.css';

function Dash() {
  
  
  return (
    <>
      <Header_dash />
      
      <div className='info'>
        <section className='primal'>
          <h1>Olá, Joaquim!!!</h1>
          <h4>Essa é sua visão geral</h4>
        </section>
      </div>
      <div className='grid_info'>
        <div className='item_info'>
          <h3>Próxima aula as</h3>
          <p>13:45</p>
        </div>
        <div className='item_info'>
          <h3>Próxima turma</h3>
          <p>45623</p>
        </div>
        <div className='item_info'>
          <h3>Próximo local:</h3>
          <p>C.2.4.5</p>
        </div>
      </div>
      <div className='salas'>
        <section className='primal'>
          <h1>SUAS SALAS</h1>
        </section>
      </div>
      <div className='grid_salas'>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        <div className='item_salas'>
          <h1>oi</h1>
          <p>asdasd</p>
        </div>
        
      </div>
      <Chat />
    </>
  );
}


export default Dash;