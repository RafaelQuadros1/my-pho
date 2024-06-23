import React, { useState } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiAtom } from "react-icons/bi";
import './Chat.css';

function Chat() {
    const [isFloatingElementOpen, setIsFloatingElementOpen] = useState(false);

    // Function to open/close the floating element
    const toggleFloatingElement = () => {
        setIsFloatingElementOpen(!isFloatingElementOpen);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect input data from the form
        const inputValue = document.querySelector('input[type="text"]').value;

        // Process input data if needed (e.g., validation, formatting)

        // Send input data to the appropriate destination (server, API endpoint)
        // Use fetch API, Axios, or other methods for data submission
        // Handle success and error scenarios (optional)

        // Optionally, provide feedback to the user (e.g., success message, error message)
    };

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
                    <div className='igns'>
                        <BiAtom style={{ color: 'black', width: '30px', height: '40px' }} />
                        <div className='text'>

                        </div>
                    </div>
                    <div className='user'>
                        <FaUserCircle className='img' style={{ color: 'black', width: '30px', height: '40px' }} />
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
