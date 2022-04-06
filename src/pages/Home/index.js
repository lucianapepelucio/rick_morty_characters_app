import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Home() {
  const [nameCharacter, setNameCharacter] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [item, setItem] = useState([]);

  //const [personagens, setPersonagens] = useState([]);
  //const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (nameCharacter) {
      setItem([]);
      console.log(nameCharacter);
      api.get(`/api/character/?page=${pageNumber}&name=${nameCharacter}`)
        .then((response) => {
          setItem(response.data);
          console.log(response.data);
        })
    }
  }, [pageNumber, nameCharacter]);

  useEffect(() => {
    setPageNumber('');
  }, []);

  // useEffect(() => {

  //   async function loadPersonagens(){
  //     const response = await api.get('api/character')
  //     setPersonagens(response.data.results);
  //   }

  //   loadPersonagens();

  // }, []);

  // const handleSubmit = useCallback((e) => {
  //   e.preventDefault();

  //   async function submit(){
  //     setLoading(true);

  //     try{

  //       if(displayValue === ''){
  //         throw new Error('Você precisa digitar o nome do personagem!');
  //       }

  //       const response = await api.get(`api/character/?page=${pageNumber}&name=${displayValue}`);

  //       console.log(response.data.results);

  //       setDisplayValue('');
  //       }
  //       catch(error){
  //         alert('Personagem não encontrado, digite o nome correto, por favor!');
  //         setDisplayValue('');
  //         console.log(error);
  //       }
  //       finally{
  //         setLoading(false);
  //         setDisplayValue('');
  //       }
  //   }

  //   submit();

  // }, [displayValue, pageNumber]);

  function handleChange(e){
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
          //loading={loading}
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
                <img src={character.image} alt={character.name}/>
                <strong>{character.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

//<Link to={`/character/${personagem.id}`}>Acessar</Link>

  