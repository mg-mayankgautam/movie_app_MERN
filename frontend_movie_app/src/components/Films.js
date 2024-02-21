import React from 'react'
import FilmsFeed from './FilmsFeed';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Films = () => {

    const [Films, setFilms] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('http://localhost:4700/films');
           // console.log(response.data);
            setFilms(response.data);
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
    
        fetchPosts();
      }, [])

  return (
    <div className='Films'>
        {Films.length ? (
                    <FilmsFeed Films={Films} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No Films to display.
                    </p>
                )}
    </div>
  )
}

export default Films