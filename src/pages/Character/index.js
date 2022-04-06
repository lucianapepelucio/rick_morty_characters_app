import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

export default function Character(){
    const {id} = useParams();

    const [character, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadCharacter(){
          const response = await api.get(`api/character/${id}`);

          setCharacter(response.data);

          setLoading(false);
      }

      loadCharacter();

    },[id]);

    if(loading){
      return(
          <div className="character-info">
              <h1>Carregando as informações do personagem! </h1>
          </div>
      )
    }

    return(
        <div className="character-info">
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
            <h3>Status: {character.status}</h3>
            <h3>Espécie: {character.species}</h3>
            <h3>Gênero: {character.gender}</h3>
            <h3>Origem: {character.origin.name}</h3>
            <h3>Locação: {character.location.name}</h3>
        </div>
    )
}