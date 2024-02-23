import React from 'react'
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import {Star} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserMovie = ({Movie}) => {

    const [style, setStyle] = useState({display: 'none'});


  return (
    <Link to={`/film/${Movie.movie}`}>
    <div className='usermovie' 
        onMouseEnter={e => { setStyle({display: 'flex'}); }}
        onMouseLeave={e => { setStyle({display: 'none'})}}
        >
        <img src={Movie.movieposter} className='usermovieposter'/>
        
        <div className='usermoviehover' style={style}>
            <div className='usermoviename'>{Movie.moviename}</div>
            <div className='usermoviedirector'>{Movie.director.map(director=>(<div key={director.name}>{director.name}</div>))}</div>
            <div className='usermovierelease'>{Movie.releasedate}</div>
            <div>
            <Rating
                readOnly 
                value={Movie.rating}
                precision={0.25}
                sx={{fontSize:'2rem', textShadow:'0 0 8px #000000'}}
                emptyIcon={<Star style={{ opacity: 0.50, color:'white'}} fontSize='inherit' />}
            />
            </div>
        </div>
    </div>
    </Link>
  )
}

export default UserMovie