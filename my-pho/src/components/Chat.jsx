import React, { useState } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import './Chat.css';

function Chat() {
    const [isFloatingElementOpen, setIsFloatingElementOpen] = useState(false);

  // Função para abrir/fechar o elemento flutuante
  const toggleFloatingElement = () => {
    setIsFloatingElementOpen(!isFloatingElementOpen);
  };
  return (
    <>
    <div className='chat'>
      <button onClick={toggleFloatingElement}><IoChatbubblesOutline style={{color: 'black', width: '30px', height: '30px', boxShadow:'0 0 5px #000000a8', borderRadius: '15%' }}/></button>
    </div>
    </>
  );
}

export default Chat;
