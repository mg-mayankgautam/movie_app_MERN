import { Link } from 'react-router-dom';
// import { useState } from 'react';

const Film = ({ film }) => {

    // const [style, setStyle] = useState({display: 'none'});
//    console.log(film);
    return (

        
        <article className="post">
           
            <Link to={`/film/${film.id}`}>
           
                <img className='movieposter' src= {film.img} />

            {/* <div className='usermovie' 
             onMouseEnter={e => { setStyle({display: 'flex'}); }}
             onMouseLeave={e => { setStyle({display: 'none'})}}
            >
                <img src={film.img} className='usermovieposter'/>
        
            <div className='usermoviehover' style={style}>
                <div className='usermoviename'>{film.name}</div>
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
            </div> */}

            </Link>
            {/* <p className="postBody">{
                (post.body).length <= 25
                    ? post.body
                    : `${(post.body).slice(0, 25)}...`
            }</p> */}
        </article>
    )
}

export default Film
