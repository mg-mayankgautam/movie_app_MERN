import React, { createRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';


const SearchResults = ({}) => {
    let { state } = useLocation();
    const [Movies, setMovies] = useState([]);
    const array = state.searchData.description;
    // const Ref = createRef();



    useEffect(() => {
      setMovies(array)
    }, []);


  //   for(let i=0; i<array.length; i++) {
    
  //     console.log(Object.values(array[i])[0]);
  
  
  
  // }

    // if(state){
    // // console.log(state.searchData.description);
    // setMovies(array)
    // // const res = [...array, {hadd: 'hogyi'}];
    // console.log(Movies);
    // setMovies(res);
      // const itemEls = useRef(new Array())

//     {.map(item => (
//       <p key={item} ref={(element) => itemEls.current.push(element)}>{item}</p>
// ))


    
    
    // setMovies([]);
    

  return (
    <>
        
    {Movies.length ? (
        <div className='SearchList'>
            {Movies.map(movie=>{

              <div>
                {/* {movie} */}
                hiiiiiiiiii
              </div>

            })}


        </div>






                
) : (
    <p style={{ marginTop: "2rem" }}>
    No search results to display</p>
                )}

    </>
  )
}

export default SearchResults