import React, { useState } from 'react';
import Headerlogin from '../components/Headerlogin'
import logo from '../assets/logo.svg'
import './login.css'

function Logins() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://ligajovemapi-private.onrender.com/api/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };
    return (
        <>
            <Headerlogin />
            <section className='logo'>
                <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
            </section>
            <div className='login_oi'>
                <form className='form' onSubmit={handleSubmit}>
                    <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Digite sua password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>Continuar</button>
                    <p>Não tem cadastro?<a href="/"> Registre-se</a></p>
                </form>
            </div>
        </>
    )
}

export default Logins
