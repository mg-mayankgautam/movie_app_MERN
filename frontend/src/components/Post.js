import { Link } from 'react-router-dom';

const Post = ({ post }) => {

   // console.log(post.id);
    return (

        
        <article className="post">
           
            <Link to={`/film/${post.id}`}>
           
                <img className='movieposter' src= {post.img} />
            </Link>
            {/* <p className="postBody">{
                (post.body).length <= 25
                    ? post.body
                    : `${(post.body).slice(0, 25)}...`
            }</p> */}
        </article>
    )
}

export default Post
