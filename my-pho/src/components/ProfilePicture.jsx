import React, { useState } from 'react';
import './ProfilePicture.css';
import { FaUser } from 'react-icons/fa';
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ProfilePicture = ({ userName, userEmail, userType, setLoading }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const logout = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      navigate('/');
      return;
    }

    const deleteToken = async () => {
      try {
        let response = await fetch('https://phoenixapi.criarsite.online/api/logout', {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
          },
        });

        if (response.ok) {
            localStorage.setItem('token', '');
            setLoading(false);
            navigate('/');
        } else {
            setError(response.statusText);
            localStorage.setItem('token', '');
            navigate('/');
        }
      } catch (error) {
          localStorage.setItem('token', '');
          console.error('Erro ao buscar dados do usuário:', error);
          setError('Erro ao buscar dados do usuário');
          navigate('/');
      }
    };
    
    deleteToken();
  }

  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 500); // tempo de animação
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="profile-picture">
      <button className="profile-button" onClick={handleToggle}>
        <FaUser size={24} />
      </button>
      {isOpen && (
        <div className={`popup ${isClosing ? 'fadeOut' : 'fadeUpIn'}`}>
          <div className="popup-content">
            <h3>{userName}</h3>
            <p>{userEmail}</p>
            <p>{userType}</p>
            <IoExitOutline className="close-icon" onClick={logout} style={{ width:'32px', height:'32px'}}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
