import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header_dash from '../components/Header_dash';
import Uploa from '../components/Uploa';
import Chat from '../components/Chat';
import './Dash.css';

function Dash() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token == '') {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        let response = await fetch('https://phoenixapi.criarsite.online/api/teacher', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
          },
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('nome', data.name);
          setUserData(data);
        } else {
          setError(response.statusText);
          localStorage.setItem('token', '');
          navigate('/login');
        }
      } catch (error) {
        localStorage.setItem('token', '');
        console.error('Erro ao buscar dados do usuário:', error);
        setError('Erro ao buscar dados do usuário');
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  if (!userData || loading) {
    return <div><Uploa/></div>;
  }

  if (userData.mode === 'M') {
    userData.mode = 'Professor - Mensalista';
  } else if (userData.mode === 'H') {
    userData.mode = 'Professor - Horista';
  } else {
    userData.mode = 'Administrador';
  }

  var replaceTime1 = userData.next_class.init.split(':').slice(0, 1) + 'h';
  var replaceTime2 = userData.next_class.init.split(':').slice(0, 2).splice(1, 1, '');

  if (userData.next_class.init === "A definir") {
    replaceTime1 = userData.next_class.init;
    replaceTime2 = '';
  }

  return (
    <>
      <Header_dash userName={userData.name} userEmail={userData.email} userType={userData.mode} setLoading={setLoading}/>
      <div className='info fadeIn'>
        <section className='primal'>
          <h1>Olá, <span className='highlight'>{userData.name.split(' ')[0].toUpperCase()}!</span></h1>
          <h4 className='.general-overview'>Sua visão geral:</h4>
        </section>
      </div>
      <div className='grid_info'>
        <div className='item_info'>
          <p>Próxima aula às:</p>
          <h3>
            {replaceTime1}
            {replaceTime2}
          </h3>
        </div>
        <div className='item_info'>
          <p>Próxima turma:</p>
          <h3>{userData.next_class.class}</h3>
        </div>
      </div>
      <div className='item_info_local'>
        <div className='item_info'>
          <p>Próximo local:</p>
          <h3>{userData.next_class.local}</h3>
        </div>
      </div>
      <div className='salas'>
        <section className='primal'>
          <h1 className='highlight'>SALAS</h1>
        </section>
      </div>
      <div className='grid_salas'>
        {userData && userData.rooms[0] ? (
          userData.rooms.map((room) => (
            <div key={room.id} className="item_salas">
              <h3>Turma {room.id}</h3>
              <p>Curso: {room.course}</p>
            </div>
          ))
        ) : (
          <h3 className='semSalas'>Nenhuma sala disponível</h3>
        )}
      </div>
      <Chat userName={userData.name} />
    </>
  );
}

export default Dash;
