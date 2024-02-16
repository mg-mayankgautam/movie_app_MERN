import React from 'react'
import { useParams, Link } from "react-router-dom";

const DisplayPost = ({posts}) => {

  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  console.log(post);
  return (
  <>
  {post &&
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
                }
  
  </>
  )
}

export default DisplayPost