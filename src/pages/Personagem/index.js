import React, { useEffect, useState } from 'react';
import './personagem-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Personagem(){
    const {id} = useParams();
    const history = useHistory();

    const [personagem, setPersonagem] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadPersonagem(){
          const response = await api.get(`api/character/${id}`);

          setPersonagem(response.data);

          if(response.data === 0){     //Não está funcionando, rever 
            history.replace("/");
            return;
          }

          setLoading(false);
      }
      loadPersonagem();

    },[history, id]);

    if(loading){
      return(
          <div className="personagem-info">
              <h1>Carregando as informações do personagem! </h1>
          </div>
      )
    }

    return(
        <div className="personagem-info">
            <h1>{personagem.name}</h1>
            <img src={personagem.image} alt={personagem.name} />
            <h3>Status: {personagem.status}</h3>
            <h3>Espécie: {personagem.species}</h3>
            <h3>Gênero: {personagem.gender}</h3>
            <h3>Origem: {personagem.origin.name}</h3>
            <h3>Locação: {personagem.location.name}</h3>

            <div className="botao">
                <button onClick={()=>{}}>Salvar</button>
            </div>
        </div>
    )
}