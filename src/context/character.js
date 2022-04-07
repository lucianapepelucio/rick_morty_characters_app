import React, { createContext, useContext, useState } from 'react';

const DEFAULT_VALUES = {
    search: '',
    characterList: [],
    pageNumber:'',
    pageInfo: {},
    character: [],
    loading: true
}

export const StatesContext = createContext(DEFAULT_VALUES);

const useStatesContext = () => useContext(StatesContext);

const StatesContextProvider = ({ children }) => {
    const [search, setSearch] = useState(DEFAULT_VALUES.search);
    const [characterList, setCharacterList] = useState(DEFAULT_VALUES.characterList);
    const [pageNumber, setPageNumber] = useState(DEFAULT_VALUES.pageNumber);
    const [pageInfo, setPageInfo] = useState(DEFAULT_VALUES.pageInfo);
    const [character, setCharacter] = useState(DEFAULT_VALUES.character);
    const [loading, setLoading] = useState(DEFAULT_VALUES.loading);

    return(
        <StatesContext.Provider 
          value = {{
              search,
              setSearch,
              characterList,
              setCharacterList,
              pageNumber,
              setPageNumber,
              pageInfo,
              setPageInfo,
              character,
              setCharacter,
              loading,
              setLoading
          }}
        >
            { children }
        </StatesContext.Provider>
    )
}

export {StatesContextProvider, useStatesContext};
export default StatesContext;

