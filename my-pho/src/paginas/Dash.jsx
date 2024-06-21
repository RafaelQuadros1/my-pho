import React from 'react'
import Header_dash from '../components/Header_dash'
import './Dash.css'

function Dash() {
    return (
        <>
            <Header_dash />
            <div className='info'>
                <h1>Olá, Acauã!</h1>
                <h4>Essa é sua visão geral</h4>

            </div>
            <div className='grid-info'>
                <div className='item-info'>
                    <h3>tutu</h3>
                    <p>askdjkajskd kajsdkjskd</p>
                </div>
                <div className='item-info'>
                    <h3>tutu</h3>
                    <p>askdjkajskd kajsdkjskd</p>
                </div>
                <div className='item-info'>
                    <h3>tutu</h3>
                    <p>askdjkajskd kajsdkjskd</p>
                </div>
            </div>
        </>
    )
}

export default Dash