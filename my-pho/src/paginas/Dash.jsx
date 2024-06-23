import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header_dash from '../components/Header_dash';
import Uploa from '../components/Uploa';
import Chat from '../components/Chat';
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
      navigate('/Logins');
      return;
    }

    // Busca informações do usuário a partir do token
    const fetchUserData = async () => {
      try {
        let response = await fetch('https://ligajovemapi-private.onrender.com/api/teacher', {
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
          setUserData(data);  // Atualiza o estado com dados do usuário
        } else {
          setError(response.statusText); // Armazena mensagem de erro
          localStorage.setItem('token', '');
          navigate('/Logins');
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
    return <div><Uploa/></div>; // Exibe mensagem de carregamento
  }

  var replaceTime1 = userData.next_class.init.split(':').slice(0, 1) + 'h';
  var replaceTime2 = userData.next_class.init.split(':').slice(0, 2).splice(1, 1, '');

  if (userData.next_class.init == "A definir") {
    replaceTime1 = userData.next_class.init;
    replaceTime2 = '';
  }

  return (
    <>
      <Header_dash />

      
      <div className='info'>
        <section className='primal'>
          <h1>Olá, <span style={{color:"#FF5038"}}>{userData.name.split(' ').slice(0, 1).join(' ').replace('"', '')}!</span></h1>
          <h4>Essa é sua visão geral</h4>
        </section>
      </div>
      <div className='grid_info'>
        <div className='item_info'>
          <p>Próxima aula às:</p>
          <h4>
            {
              replaceTime1
            }
            {
              replaceTime2
            }
          </h4>
        </div>
        <div className='item_info'>
          <p>Próxima turma:</p>
          <h4>{userData.next_class.class}</h4>
        </div>
        
      </div>
      <div className='item_info_local'>
        <div className='item_info'>
          <p>Próximo local:</p>
          <h4>{userData.next_class.local}</h4>
        </div>
      </div>
      <div className='salas'>
        <section className='primal'>
          <h1 style={{color:"#FF5038"}}>SALAS</h1>
        </section>
      </div>
      <div className='grid_salas'>
      {userData && userData.rooms ? (
            userData.rooms.map((room) => (
              <div key={room.id} className="item_salas">
                <h3>Turma {room.id}</h3>
                <p>Curso: {room.course}</p>
              </div>
            ))
          ) : (
            <div>Nenhuma sala disponível</div>
          )}
      </div>

      <Chat />
    </>
  );
}


export default Dash;