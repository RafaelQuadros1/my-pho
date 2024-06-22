import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dash.css';

function Dash() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Armazena dados do usuário
  const [error, setError] = useState(null); // Armazena mensagem de erro
  const tokens = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redireciona para a página de erro se não houver token
      navigate('/error');
      return;
    }

    // Busca informações do usuário a partir do token
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://ligajovemapi-private.onrender.com/api/teacher', {
          method: 'POST', // Specify the HTTP method (POST)
          headers: {
            'Content-Type': 'application/json', // Specify JSON content
          },
          body: JSON.stringify({ token: token }), // Include token in body
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Atualiza o estado com dados do usuário
        } else {
          setError(response.statusText); // Armazena mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setError('Erro ao buscar dados do usuário'); // Mensagem genérica de erro
      }
    };
    console.log(tokens)
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
    <div>
      <h1>Bem-vindo, {userData.name}!</h1>
      {/* Exibe outras informações do usuário aqui */}
    </div>
  );
}

export default Dash;
