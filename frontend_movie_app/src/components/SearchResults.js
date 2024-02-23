import React, { createRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';


const SearchResults = ({}) => {
    let { state } = useLocation();
    const [Movies, setMovies] = useState([]);
    const array = state.searchData.description;
    // const Ref = createRef();
console.log(array);


    useEffect(() => {
      setMovies(array)
    }, [state]);

    
    // console.log(Object.entries(Movies[1]));
// console.log(Movies[1].photo_width);

// for(let i=0; i<array.length; i++) {
    
//   console.log(Object.values(array[i])[0]);
const navigate = useNavigate();

const handleMoviePost = async(IMDBid)=>{
  console.log(IMDBid);

  const URL = `https://search.imdbot.workers.dev/?tt=${IMDBid}`;

  // const results = await response.json;
  // console.log(results);
  fetch(URL)
  .then((res)=>{
      return res.json();
  })
  .then(async(moviefromapi)=>{
    // console.log(moviefromapi);
      
     try{
     const data = await axios.post('http://localhost:4700/movie/addmovie', {moviefromapi: moviefromapi});   
     
     const movieID = data.data;
      navigate(`/film/${movieID}`)
     } 
     catch(e){console.log(e);}
     
    })  
.catch((err)=> {console.log(err)})
}

// }

    

  return (
    <>
        
    {Movies.length ? (
        <div className='SearchList'>
          <div style={{textAlign:'left', fontWeight:'200'}}>Search Results</div>
          {Movies.map(movie=>{
              return(
              <div className='searchres' key={Object.values(movie)[2]} onClick={() => handleMoviePost(Object.values(movie)[2])}>
                
                <div className='searchinfo'>
                    <div className='searchtitle'>{Object.values(movie)[0]}</div>
                    <div className='searchyear'>{Object.values(movie)[1]}</div>
                </div>
                <img src={Object.values(movie)[8]} className='searchposter' />
                            
              </div>
        // const moviess= Object.entries(movie)
              )
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