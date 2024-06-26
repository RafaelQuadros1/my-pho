import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiAtom } from "react-icons/bi";
import Markdown from 'react-markdown';

import './Chat.css';

function Chat({ userName }) {
  const navigate = useNavigate();
  const [isFloatingElementOpen, setIsFloatingElementOpen] = useState(false);
  const [messages, setMessages] = useState([]); // State to store messages
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); // State to control welcome message
  const messagesEndRef = useRef(null); // Ref to track the end of messages
  const [type, setType] = useState('new');

  const toggleFloatingElement = () => {
    setIsFloatingElementOpen(!isFloatingElementOpen);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.floating_element') && !event.target.closest('.chat button')) {
      setIsFloatingElementOpen(false);
    }
  };

  useEffect(() => {
    if (isFloatingElementOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isFloatingElementOpen]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages change
  }, [messages]); // Ensure this effect runs whenever the messages array changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const inputElement = document.querySelector('input[type="text"]');
    const inputValue = inputElement.value.trim(); // Trim leading and trailing whitespace

    if (!inputValue) {
      return; // Prevent sending empty messages
    }

    const token = localStorage.getItem('token');
    if (token === '') {
      navigate('/login');
      return;
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { text: inputValue, isUser: true }
    ]);

    inputElement.value = '';
    setShowWelcomeMessage(false); // Hide the welcome message

    scrollToBottom(); // Scroll to the bottom after adding the user's message

    try {
      let response = await fetch('https://phoenixapi.criarsite.online/api/teacher/chat', {
        method: 'POST',
        body: JSON.stringify({ type: type, input: inputValue }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setType('continue');
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data, isUser: false }
        ]);
        scrollToBottom(); // Scroll to the bottom after adding the response
      } else {
        navigate('/login');
        localStorage.setItem('token', '');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      navigate('/login');
    }
  };

  return (
    <>
      <div className='chat'>
        <button onClick={toggleFloatingElement}>
          <IoChatbubblesOutline style={{ color: 'black', width: '30px', height: '30px' }} />
        </button>
      </div>
      <div className={`floating_element ${isFloatingElementOpen ? 'open' : ''}`}>
        <FloatingElementComponent 
          userName={userName} 
          messages={messages} 
          onSubmit={handleSubmit} 
          messagesEndRef={messagesEndRef} 
          showWelcomeMessage={showWelcomeMessage} 
        />
      </div>
    </>
  );
}

const FloatingElementComponent = ({ userName, messages, onSubmit, messagesEndRef, showWelcomeMessage }) => {
  return (
    <div className="body_chat">
      {showWelcomeMessage && <div className="welcome_message">Diga "Olá" para a Ignis</div>}
      <div className='men'>
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.isUser ? (
              <>
                <div className='grid_user'>
                  <FaUserCircle className='img' style={{ color: 'black', width: '40px', height: '40px' }} />
                  <p className='userName'>{userName.split(' ').slice(0, 1).join(' ').replace('"', '')}</p>
                </div>
                <div className='text'>{message.text}</div>
              </>
            ) : (
              <>
                <div className='grid_user'>
                  <BiAtom style={{ color: 'black', width: '40px', height: '40px' }} />
                  <p>Ignis</p>
                </div>
                <div className='text'><Markdown>{message.text ? message.text : 'Mensagem não disponível'}</Markdown></div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <section className='inputs'>
        <form className='input_from' onSubmit={onSubmit}>
          <input type="text" placeholder="Digitar sua mensagem..." />
          <button type="submit"><IoIosArrowForward className='arrow' /></button>
        </form>
      </section>
    </div>
  );
};

export default Chat;