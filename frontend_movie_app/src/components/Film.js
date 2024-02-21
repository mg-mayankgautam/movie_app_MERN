import { Link } from 'react-router-dom';

const Film = ({ film }) => {

   // console.log(post.id);
    return (

        
        <article className="post">
           
            <Link to={`/film/${film.id}`}>
           
                <img className='movieposter' src= {film.img} />
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
