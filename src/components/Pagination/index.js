import React from 'react';

const Pagination = (pages, pageNumber, setPageNumber) => {
  return(
    <div>
      {Array.from(Array(pages), (_, index) => {
        return <button
                 style={index === pageNumber ? {backgroundColor: "gray"} : null} 
                 value={index} 
                 onClick={(e) => setPageNumber(Number(e.target.value))}
               >
                 {index + 1}
               </button>
      })}
    </div>
  )
}

export default Pagination;

