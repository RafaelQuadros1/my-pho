import React, { useState, useEffect } from 'react';
import Headerlogin from '../components/Headerlogin';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Uploa from '../components/Uploa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css';

function Logins() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Estado para mensagem de erro
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== '') {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            let response = await fetch('https://ligajovemapi-private.onrender.com/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Dados inválidos. Verifique seu email e senha.');
                } else {
                    setError(`Erro: ${response.statusText}`);
                }
                setLoading(false);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setEmail('');
            setPassword('');
            setLoading(false);
            navigate('/dashboard');
        } catch (error) {
            localStorage.setItem('token', '');
            console.error('Erro ao buscar dados do usuário:', error);
            setError('Erro ao buscar dados do usuário');
            setLoading(false);
        }
    };

    if (loading) {
        return <div><Uploa/></div>;
    }

    return (
        <>
            <Headerlogin />
            <section className='logo'>
                <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
            </section>
            <div className='login_oi'>
                <form className='form' onSubmit={handleSubmit}>
                    {error && <p className='error'>{error}</p>} {/* Exibe a mensagem de erro */}
                    <input
                        required
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    <button type='submit'>Continuar</button>
                    <p className='aviso'>O registro é realizado por sua instituição!</p>
                </form>
            </div>
        </>
    );
}

export default Logins;
