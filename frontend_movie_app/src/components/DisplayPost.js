import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import UserPanel from './UserPanel';


const DisplayPost = ({posts}) => {

const [moviename, setmoviename] = useState('')
const [Plot, setPlot] = useState('')
const [Release_date, setRelease_date] = useState('')
const [Runtime, setRuntime] = useState('')
const [MoviePoster, setMoviePoster] = useState('')
const [actors, setactors] = useState('');
const [Directors, setDirectors] = useState('');
const [Genres, setGenres] = useState('');


  const { id } = useParams();
  //const post = posts.find(post => (post.id).toString() === id);
//  console.log(post);

useEffect(() => {
    const getmoviedata = async () => {
        try {
          const URL =  `http://localhost:4700/movie?id=${id}`;
          //console.log('url',URL);
          const response = await axios.get(URL);

          //console.log(response.data);
          setmoviename(response.data.name)
          setPlot(response.data.plot.plainText)
          setRelease_date(response.data.release_date)
          setRuntime(response.data.runtime)
          setMoviePoster(response.data.url)
          setactors(response.data.actors)
          setDirectors(response.data.director)
          setGenres(response.data.genres)
          
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


console.log(Directors);

  return ( 
 
      
  <main className='DisplayPost'>

    <article className='MainPoster'>
        <img src={MoviePoster} alt="poster"  className='movieImg' />
    </article>

    <article className='AboutMovie'>

      <section className='movieInfo'>
          <div className='movieTitle'>{moviename.text}</div>
          <div>{Release_date.year}</div>
          <div className='directors'>
               <p> Directed By: </p>
                
                {Directors &&
                Directors.map(director => (
                        <p key={crypto.randomUUID()}>{director.name}</p>
                  ))
                  
                  }
                  {/* {Directors && Directors[0].name} */}
          </div>
      </section>

      <section className='movieAllinfo'>
          <div>
                <div className='moviePlot'>{Plot}</div>
                <p>{Runtime}</p>

                <div className='CastGenre'>
                    <div>
                        Cast: {actors && actors.map(actor => (
                                <div key={crypto.randomUUID()}>{actor.name}</div>
                          ))} 
                    </div>
                    <div>
                        Genres: 
                        {/* {Genres && Genres.map(Genre => (
                                <p key={Genre.id}>{Genre.text}</p>
                          ))}  */}
                    </div>
                </div>
          </div>
          
          <UserPanel/>
      </section>
    </article>

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