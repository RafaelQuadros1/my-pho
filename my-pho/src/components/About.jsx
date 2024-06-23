import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { RxDoubleArrowDown } from "react-icons/rx";
import { LuClipboardSignature } from "react-icons/lu";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { LuCpu } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import './About.css'

function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className='about'>
        <h1>PHOENIX</h1>
        <h3>SEU PROGRESSO NA PALMA DA MÃO</h3>
        <button onClick={(event) => {
        event.preventDefault();
        navigate('/Login');
      }}>Acesar painel </button>
      </div>
      <div className='arrow'>
        <a className='jk' href="#title"><RxDoubleArrowDown  style={{width: '30px', height: '30px', }}/></a>
      </div>
      <div id='title' className='title'>
        <h1>PRINCIPAIS USOS</h1>
      </div>

      <div className='grid-container'>
        <div className='grid-item'>
          <h2><LuClipboardSignature style={{ color: '#FF5038' }}/> Organizar dados</h2>
          <h3>Com o uso do nosso sistema, se torna muito mais fácil organizar as planilhas.</h3>
        </div>
        <div className='grid-item'>
          <h2><HiOutlineCubeTransparent style={{ color: '#FF5038' }} /> Produtividade</h2>
          <h3>Com base nos dados coletados, conseguimos estimar o desenvolvimento.</h3>
        </div>
        <div className='grid-item'>
          <h2><LuCpu style={{ color: '#FF5038' }}/> Consulta com a Ignis</h2>
          <h3>Além de plotar e exportar dados, nossa IA os usa de base nas conversas.</h3>
        </div>
      </div>
    </>
  )
}

export default About