import React, { useState } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiAtom } from "react-icons/bi";
import './Chat.css';
import { useNavigate } from 'react-router-dom';

function Chat() {
    const navigate = useNavigate();
    const [isFloatingElementOpen, setIsFloatingElementOpen] = useState(false);

    // Function to open/close the floating element
    const toggleFloatingElement = () => {
        setIsFloatingElementOpen(!isFloatingElementOpen);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect input data from the form
        const input = document.querySelector('input[type="text"]').value;

        const type = 'continue';

        // Verifica se o token existe no localStorage
        const token = localStorage.getItem('token');
        if (token == '') {
        // Redireciona para a página de erro se não houver token
        navigate('/login');
        return;
        }

        try {
            let response = await fetch('https://ligajovemapi-private.onrender.com/api/teacher/chat', {
            method: 'POST', // Specify the HTTP method 
            body: JSON.stringify({ type, input }),
            headers: {
                //Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }
            });
    
            if (response.ok) {
            const data = await response.json(); // Messagem do IA
            } else {
            navigate('/login');
            localStorage.setItem('token', '');
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            navigate('/login'); // Mensagem genérica de erro
        }
    }

    return (
        <>
            <div className='chat'>
                <button onClick={toggleFloatingElement}>
                    <IoChatbubblesOutline style={{ color: 'black', width: '30px', height: '30px' }} />
                </button>
            </div>
            {isFloatingElementOpen && (
                <FloatingElementComponent onSubmit={handleSubmit} />
            )}
        </>
    );
}

const FloatingElementComponent = ({ onSubmit }) => {
    return (
        <div className="floating_element">
            <div className='body_chat'>
                <div className='men'>
                    <div className='user'>
                        <FaUserCircle className='img' style={{ color: 'black', width: '30px', height: '40px' }} />
                        <div className='text'>

                        </div>
                    </div>
                    <div className='igns'>
                        <BiAtom style={{ color: 'black', width: '30px', height: '40px' }} />
                        <div className='text'>

                        </div>
                    </div>
                </div>
                <section className='inputs'>
                    <form className='input_from' onSubmit={onSubmit}> {/* Call onSubmit on submit */}
                        <input type="text" placeholder="Digitar sua mensagem..." />
                        <button type="submit"><IoIosArrowForward /></button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Chat;
