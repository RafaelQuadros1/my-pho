import React, { useState } from 'react'
import Headerlogin from '../components/Headerlogin'
import Headersingup from '../components/Headersingup'
import logo from '../assets/logo.svg'
import './singup.css'

function Singups() {
  const [name, setName] = useState('');
  const [mode, setMode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://phoenixapi.criarsite.online/api/register", {
        method: 'POST',
        body: JSON.stringify({ name, mode, email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Exemplo: exiba os dados no console
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  return (
    <div>
      <Headersingup />
      <section className='logo'>
        <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
      </section>
      <div className='singup'>
        <form className='form' onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Continuar</button>
          <button type='submit'>Continuar</button>
          <p>Já tem cadastro?<a href="/">Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default Singups
