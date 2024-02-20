import React, { createRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';


const SearchResults = ({}) => {
    let { state } = useLocation();
    const [Movies, setMovies] = useState([]);
    const array = state.searchData.description;
    // const Ref = createRef();

    

    if(state){
    // console.log(state.searchData.description);
    setMovies([...Movies, array ])
    // const res = [...array, {hadd: 'hogyi'}];
    console.log(Movies);
    // setMovies(res);
      // const itemEls = useRef(new Array())

//     {.map(item => (
//       <p key={item} ref={(element) => itemEls.current.push(element)}>{item}</p>
// ))


    }
    
    // setMovies([]);
    

  return (
    <>
        
    {Movies.length ? (
        <div className='SearchList'>



        </div>






                
) : (
    <p style={{ marginTop: "2rem" }}>
    No search results to display</p>
                )}

    </>
  )
}

export default SearchResults