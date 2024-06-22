import React, { useState, useEffect } from 'react';
import Headerlogin from '../components/Headerlogin';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './login.css';

function Logins() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsLoggedIn, setIsLoggedIn] = useState(false); // State for login status

    useEffect(() => {
        localStorage.setItem('token', '');
        console.log(localStorage.getItem('token'));
        
        // Verifica se o token existe no localStorage
        const token = localStorage.getItem('token');
        if (token != '') {
            validateToken();
        }

        async function validateToken() {
            try {       
                const response = await fetch('https://ligajovemapi-private.onrender.com/api/login', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'authorization': token,
                    },
                });

                if (!response.ok) {
                    return Error(response.status);
                }

                const data = await response.json();

                // Store successful token in localStorage
                localStorage.setItem('token', data.token);
                console.log(localStorage.getItem('token'));
                navigate('/Dash');
            } catch  (error) {
                console.error('Erro na requisição:', error);
            }
        }

        // Check for existing data in localStorage on component mount
        /*const storedData = localStorage.getItem('userData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setIsLoggedIn(true); // Set logged in if data exists
            } catch (error) {
                console.error('Error parsing stored data:', error);
                localStorage.removeItem('userData'); // Remove corrupted data
            }
        }*/

    }, []); // Empty dependency array to run only once on mount

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await fetch('https://ligajovemapi-private.onrender.com/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwiaWF0IjoxNzE4OTk1MzcwLCJleHAiOjE3MTg5OTY1NzB9.ck9GWRAdzmUl_UYkbYUdVShE9iB4iZb1iacs72DTHH8',
                },
            });

            if (!response.ok) {
                throw new Error(`Dados Invalidos: ${response.status}`);

            }

            const data = await response.json();
            // Store successful login data in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', JSON.stringify(email));
            localStorage.setItem('password', JSON.stringify(password));
            navigate('/Dash');
        } catch (error) {   
            console.error('Erro na requisição:', error);
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
                    <input
                        required
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Digite sua password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Continuar</button>
                    <p>Não tem cadastro?<a href="/"> Registre-se</a></p>
                </form>


            </div>
        </>
    );
}

export default Logins;
