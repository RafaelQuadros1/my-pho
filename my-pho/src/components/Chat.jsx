import React, { useState } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
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
                <button onClick={toggleFloatingElement}><IoChatbubblesOutline style={{ color: 'black', width: '30px', height: '30px' }} /></button>
            </div>
            {isFloatingElementOpen && (
                <FloatingElementComponent />
            )}
        </>
    );
}
const FloatingElementComponent = () => {
    return (
        <div className="floating_element">
            <div className='body_chat'>
                <div className='men'>
                <div className='igns'>
                        <img src="" alt="" />
                        <div className='text'>asd</div>
                    </div> 
                    <div className='user'>
                        <img src="" alt="" />
                        <div className='text'>asd</div>
                    </div> 
                </div>
                <section className='inputs'>
                    <form className='input_from'>
                        <input type="text" placeholder="Digitir sua mensagem..." />
                        <button><IoIosArrowForward /></button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Chat;
