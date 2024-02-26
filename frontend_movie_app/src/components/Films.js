import React from 'react'
import FilmsFeed from './FilmsFeed';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { flexbox } from '@mui/system';

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
                    // <p style={{ marginTop: "2rem" }}>
                    //     No Films to display.
                    // </p>
                    // <div style={flexbox}>
                    <Stack spacing={3}>
                        <br></br>
                        {/* For variant="text", adjust the height via font-size */}
                        <Skeleton variant="text" sx={{ fontSize: 'rem' }} />
                      
                        <Skeleton variant="circular" width={80} height={80}sx={{ bgcolor: 'grey.900' }} />
                        <Skeleton variant="rectangular" width={210} height={60}sx={{ bgcolor: 'grey.900' }} />
                        <Skeleton variant="rounded" width={1000} height={300} sx={{ bgcolor: 'grey.900' }}/>
                    </Stack>
                    // </div>
                )}
    </div>
  )
}

export default Films