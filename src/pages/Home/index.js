import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Pagination from '../../components/Pagination';
import './styles.css';

const LIMIT = 12;

export default function Home() {
  const [nameCharacter, setNameCharacter] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [item, setItem] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    setItem([]);
    console.log(nameCharacter);
    api.get(`/api/character/?page=${pageNumber}&name=${nameCharacter}`)
      .then((response) => {
        setItem(response.data);
        console.log(response.data);
      })
  }, [pageNumber, nameCharacter]);

  useEffect(() => {
    setPageNumber('');
  }, []);

  function handleChange(e){
    e.preventDefault();
    setNameCharacter(e.target.value);
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
      {item.info && (
        <Pagination 
          limit={LIMIT} 
          total={item.info.count} 
          skip={skip}
          setSkip={setSkip}
        />
      )}
    </div>
  )
}




  