import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header_dash from '../components/Header_dash';
import './Dash.css';

function Dash() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Armazena dados do usuário
  const [error, setError] = useState(null); // Armazena mensagem de erro

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem('token');

    //console.log(token);

    if (token == '') {
      // Redireciona para a página de erro se não houver token
      navigate('/Login');
      return;
    }

    // Busca informações do usuário a partir do token
    const fetchUserData = async () => {
      try {
        let response = await fetch('http://localhost:3001/api/teacher', {
          method: 'GET', // Specify the HTTP method 
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': token
          },
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('nome', data.name);   
          setUserData(data); 
          console.log(localStorage.getItem('token')); // Atualiza o estado com dados do usuário
        } else {
            console.log(localStorage.getItem('token'));
          setError(response.statusText); // Armazena mensagem de erro
          //localStorage.setItem('token', '');
          //navigate('/Login'); 
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setError('Erro ao buscar dados do usuário'); // Mensagem genérica de erro
      }
    };
   
        fetchUserData();
    }, []); // Executa o useEffect apenas na primeira renderização

    // Exibe dados do usuário ou mensagem de erro
    if (error) {
        return <div>Ocorreu um erro: {error}</div>;
    }

    if (!userData) {
        return <div>Carregando...</div>; // Exibe mensagem de carregamento
    } 

    return (
        <>
            <Header_dash />
            <div className='info'>
                <h1>Olá, {localStorage.name.split(' ').slice(0, 1).join(' ').replace('"','')}</h1>
                <h4>Essa é sua visão geral</h4>
            </div>
            <div className='grid-info'>
                <div className='item-info'>
                    <h3>Próxima aula em:</h3>
                    <p></p>
                </div>
                <div className='item-info'>
                    <h3>Próxima turma:</h3>
                    <p></p>
                </div>
                <div className='item-info'>
                    <h3>Próximo local:</h3>
                    <p></p>
                </div>
            </div>
        </>
    );
    }


export default Dash;