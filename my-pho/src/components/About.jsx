import React, { useState, useEffect } from 'react';
import { RxDoubleArrowDown } from "react-icons/rx";
import { LuClipboardSignature } from "react-icons/lu";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { LuCpu } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Uploa from '../components/Uploa';
import './About.css';

function About() {
  const navigate = useNavigate();
  const [gridVisible, setGridVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setGridVisible(true);
  }, []);

  const verifyToken = () => {
    const token = localStorage.getItem('token');

    if (token != '') {
        validateToken();
    } else {
      navigate('/login')
    }

    async function validateToken() {
        try {       
            const response = await fetch('https://ligajovemapi-private.onrender.com/api/login', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
            });

            if (!response) {
              return <div><Uploa/></div>;
            }

            if (!response.ok) {
                localStorage.setItem('token', '');
                navigate('/login');
            }

            const data = await response.json();

            // Store successful token in localStorage
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch  (error) {
            localStorage.setItem('token', '');
            console.error('Erro ao buscar dados do usuário:', error);
            setError('Erro ao buscar dados do usuário');
        }
    }
  }

  const handleGridClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setGridVisible(false);
      setIsClosing(false);
    }, 500); // tempo de animação
  };

  const scrollToSection = () => {
    document.getElementById('title').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className='about'>
        <h1>PHOENIX</h1>
        <h3>SEU PROGRESSO NA</h3>
        <h3>PALMA DA MÃO</h3>
        <button onClick={verifyToken}>Acessar painel</button>
      </div>
      <div className='arrow'>
        <button className='jk' onClick={scrollToSection}>
          <RxDoubleArrowDown className='arrow-icon' style={{ width: '30px', height: '30px' }}/>
        </button>
      </div>
      <div id='title' className='title'>
        <h1>PRINCIPAIS USOS</h1>
      </div>
      {gridVisible && (
        <div className={`grid-container ${isClosing ? 'fadeOut' : 'fadeIn'}`}>
          <div className='grid-item'>
            <h2><LuClipboardSignature className='imagem' style={{ color: '#FF5038' }} /> Organizar dados</h2>
            <h3 className='titulo'>Com o uso do nosso sistema, se torna muito mais fácil organizar as planilhas.</h3>
          </div>
          <div className='grid-item'>
            <h2><HiOutlineCubeTransparent className='imagem' style={{ color: '#FF5038' }} /> Produtividade</h2>
            <h3>Com base nos dados coletados, conseguimos estimar o desenvolvimento.</h3>
          </div>
          <div className='grid-item'>
            <h2><LuCpu className='imagem' style={{ color: '#FF5038' }} /> Consulta com a Ignis</h2>
            <h3>Além de plotar e exportar dados, nossa IA os usa de base nas conversas.</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
