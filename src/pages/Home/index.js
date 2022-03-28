import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs'; 
import './home.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {

    async function loadPersonagens(){
      const response = await api.get('api/character')
      setPersonagens(response.data.results);
    }

    loadPersonagens();

  }, []);

  return (
    <div className="container">

      <form className= "formulario" onSubmit={()=>{}}>
        <input type="text" placeholder="Digite o nome do personagem" />

        <button className="botao">
          <BsSearch color="black" size={14}/>
        </button>
      </form>

      <div className="lista-personagens">
        {personagens.map((personagem) => {
          return(
            <article key={personagem.id}>
              <strong> {personagem.name}</strong>
              <img src={personagem.image} alt={personagem.name} />
              <Link to={`/character/${personagem.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}