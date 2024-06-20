import React from 'react'
import Header_dash from '../components/Header_dash'
import './Dash.css'

function Dash() {
    return (
        <>
            <Header_dash />
            <div className='about'>
                <h1>Olá Acauã!</h1>
                <h3>Essa é sua visão geral</h3>
                <div className='grid-container'>
                    <div className='grid-item'>
                        <h1>oi</h1>
                    </div>
                    <div className='grid-item'>
                        <h1>oi</h1>
                    </div>
                    <div className='grid-item'>
                        <h1>oi</h1>
                    </div>
                </div>
                <h1>Suas turmas</h1>

                <div className='grid-turmas'>
                    <div className='item-turma'>
                        <h1>oi</h1>
                    </div>
                    

                </div>
            </div>

        </>
    )
}

export default Dash