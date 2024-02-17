import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';

const DisplayPost = ({posts}) => {

const [moviename, setmoviename] = useState('')
const [Plot, setPlot] = useState('')
const [Release_data, setRelease_data] = useState('')
const [Runtime, setRuntime] = useState('')
const [MoviePoster, setMoviePoster] = useState('')
const [actors, setActors] = useState('');
const [directors, setDirectors] = useState('');


  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
//  console.log(post);

useEffect(() => {
    const getmoviedata = async () => {
        try {
          const URL =  `http://localhost:4700/movie?id=${id}`;
          //console.log('url',URL);
          const response = await axios.get(URL);

          console.log(response.data.director);
          setmoviename(response.data.name)
          setPlot(response.data.plot.plainText)
        
          setRelease_data(response.data.release_data)
          setRuntime(response.data.runtime)
          setMoviePoster(response.data.url)
          setActors(response.data.actors)
          setDirectors(response.data.director)
          
        } catch (err) {
          if (err.response) {
            // Not in the 200 response range 
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      }
  
  getmoviedata();
}, [])


console.log({directors});
  return (    
      
  <main className='DisplayPost'>

    <div>
        <img src={MoviePoster} alt="MainPoster"  className='MainPoster' />
    </div>

    <div className='AboutMovie'>
      <div className='movieinfo'>
          <h1>{moviename.text}</h1>
          <div>{Release_data.year}</div>
          <div className='directors'>
               <p> Directed By: </p>
                {directors.map(director => (
                        <p>{director.name}</p>
                  ))}
          </div>
      </div>
        <div>{Plot}</div>
        <div>{Runtime}</div>
        <div>
                Cast: {actors.map(actor => (
                        <p>{actor.name}</p>
                  ))}
        </div>
        <div>genre</div>
    </div>

  {/* {post &&
        <>
                        <h2>{post.name}</h2>
                      
                     
        </>
  }
  {!post &&
        <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </>
          } */}
  
  </main>
  )
}

export default DisplayPost