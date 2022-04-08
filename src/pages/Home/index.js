import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../../services/api';
import { useStatesContext } from '../../context/character';
import './styles.css';

export default function Home() {

  const { search, setSearch, characterList, setCharacterList, pageNumber, setPageNumber, pageInfo, setPageInfo } = useStatesContext();
  
  useEffect(() => {
    setCharacterList([]);
    api.get(`/api/character/?page=${pageNumber}&name=${search}`)
      .then((response) => {
        setCharacterList(response.data.results);
        setPageInfo(response.data.info);
      })
  }, [pageNumber, search, setCharacterList, setPageInfo]);

  let timeout;
  
  const handleChange = e => {
    clearTimeout(timeout);
    const searchValue = e.target.value;
    
    timeout = setTimeout(() => {
        setSearch(searchValue);
    },1000)
  }

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  } 

  return (
    <div className="container">
      <div>
        <input
          className="character-input"
          type="search"
          placeholder="Digite o nome do personagem" 
          onChange= {handleChange}
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
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount= {pageInfo.pages}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}


  