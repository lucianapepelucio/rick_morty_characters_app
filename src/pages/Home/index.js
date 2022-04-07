import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../../services/api';
import './styles.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const [pageInfo, setPageInfo] = useState({});
  
  useEffect(() => {
    setCharacterList([]);
    console.log(search);
    api.get(`/api/character/?page=${pageNumber}&name=${search}`)
      .then((response) => {
        setCharacterList(response.data.results);
        setPageInfo(response.data.info);
        console.log(response.data.results);
      })
  }, [pageNumber, search]);

  function handleChange(e){
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  return (
    <div className="container">
      <div>
        <input
          className="character-input"
          type="search"
          placeholder="Digite o nome do personagem" 
          value={search} 
          onChange={handleChange} 
        />
      </div>
      <div className="characters-list">
          {!characterList && (
            <span>Carregando....</span>
          )}
          {characterList && (
            <ul>
              {characterList.map((character) => (
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
     
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="<next>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount= {pageInfo.pages}
        previousLabel="<previous>"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}


  