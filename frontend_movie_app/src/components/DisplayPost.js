import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

const DisplayPost = ({posts}) => {

  const { id } = useParams();
  //const post = posts.find(post => (post.id).toString() === id);
 // console.log(post);

useEffect(() => {
    const getmoviedata = async () => {
        try {
          const URL =  `http://localhost:4700/movie?id=${id}`;
          //console.log('url',URL);
          const response = await axios.get(URL);

          console.log(response);
          
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


  return (
  <>
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
  
  </>
  )
}

export default DisplayPost