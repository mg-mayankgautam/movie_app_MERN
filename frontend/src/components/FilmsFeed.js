import React from 'react'
import Film from './Film';

const FilmsFeed = ({Films}) => {
console.log('Films', Films);
  return (
    <>
            <p className='trending_heading'>
              All Movies to select from!
            </p>
            
            <div className='movies'>
                {Films.map(film =>(
                        <Film key={film.id} film={film} />
                ))}
            {/* {Films.map(Film => (
                // <div className='movies'>
                  <Film key={Film.id} Film={Film} />
                  // </div>
            ))} */}
            </div>
    </>
  )
}

export default FilmsFeed