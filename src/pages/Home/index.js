import React, { useEffect, useState, useCallback } from 'react';
import { BsSearch } from 'react-icons/bs'; 
import { FaSpinner } from 'react-icons/fa';
import './home.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [personagens, setPersonagens] = useState([]);
  const [newPersonagem, setNewPersonagem] = useState('');
  const [listaPersonagem, setListaPersonagem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function loadPersonagens(){
      const response = await api.get('api/character')
      setPersonagens(response.data.results);
    }

    loadPersonagens();

  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit(){
      setLoading(true);

      try{
        const response = await api.get(`api/character/?name=${newPersonagem}`);

        console.log(response.data.results);

        const data = {
          name: response.data.results.name,
        }

        setListaPersonagem([...listaPersonagem, data]);
        setNewPersonagem('');

        }
        catch(error){
          alert('Personagem não encontrado, digite o nome correto, por favor!');
          setNewPersonagem('');
          console.log(error);
        }
        finally{
          setLoading(false);
          setNewPersonagem('');
        }
    }

    submit();

  }, [newPersonagem, listaPersonagem]);

  function handleInputChange(e){
    setNewPersonagem(e.target.value);
  }

  return (
    <div className="container">

      <form className= "formulario" onSubmit={handleSubmit}> 
        <input 
        type="text" 
        placeholder="Digite o nome do personagem" 
        value={newPersonagem}
        onChange={handleInputChange}
        />

        <button className="botao" type="submit" loading={loading}>
          {
            loading ? (
              <FaSpinner color="black" size={14}/>
            ) : (
              <BsSearch color="black" size={14}/>
            )
          }
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