import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Home() {
  const [nameCharacter, setNameCharacter] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem([]);
    console.log(nameCharacter);
    api.get(`/api/character/?page=${pageNumber}&name=${nameCharacter}`)
      .then((response) => {
        setItem(response.data);
        console.log(response.data);

        // if(response.data.length === 0){
        //   console.log('Não Tem coisa!');
        // }
      })
  }, [pageNumber, nameCharacter]);

  useEffect(() => {
    setPageNumber('');
  }, []);

  function handleChange(e){
    setNameCharacter(e.target.value);
    e.preventDefault();
  }

  return (
    <div className="container">
      <div>
        <input
          className="character-input"
          type="search"
          placeholder="Digite o nome do personagem" 
          value={nameCharacter} 
          onChange={handleChange} 
        />
      </div>
      <div className="characters-list">
        {nameCharacter && !item.results && (
          <span>Carregando...</span>
        )}
        {item.results && (
          <ul>
            {item.results.map((character) => (
              <li key={character.id}>
                <Link to={`/character/${character.id}`}>
                  <img src={character.image} alt={character.name}/>
                </Link>
                <strong>{character.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}




  