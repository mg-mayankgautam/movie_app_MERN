import { Link } from 'react-router-dom';

const Post = ({ post }) => {

    console.log(post.id);
    return (

        
        <article className="post">
           
            <Link to={`/post/${post.id}`}>
           
                <img className='movieposter' src= "https://white-cinema.be/wp-content/uploads/2023/12/Anyone_4x5_NL.jpg" />

                {/* <p>{post.name}</p> */}
                {/* <p className="postDate">{post.datetime}</p> */}
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
