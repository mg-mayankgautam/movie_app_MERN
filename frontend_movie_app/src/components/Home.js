import Feed from './Feed';
import banner3 from './utils/banner3.jpg';
import banner3m from './utils/banner3m.jpg';
import useAuth from '../hook/useAuth';
import axios from 'axios';
import { useState, useEffect } from 'react';




const Home = ({ posts }) => {
  const {auth, setAuth}=useAuth();


    useEffect(() => {
        
      
        const verifyAuth = async ()=>{
            try {
                const URL =  `http://localhost:4700/isauth`;
                //console.log('url',URL);
                const response = await axios.get(URL);
 
                console.log(response.data.auth);
               if(!response.data.auth){
               
                     
                   console.log('auth')
                   
                   }
 
 
                  else if(response.data.auth){
                   
                   console.log(response.data.auth);
                   const user = response.data.auth;
                   setAuth({user});
                  
                  }   
           
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
    
    
      verifyAuth();
    }, [])




    return (
        <main className="Home">
            <div className='bannerdiv'>
                    <img src={banner3} alt="Banner" className='banner'/>
                   
                    <div className='bannertext'>Your Social Media <br />for Movies</div>
                </div>
                {posts.length ? (
                    <Feed posts={posts} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No posts to display.
                    </p>
                )}
        </main>
    )
}

export default Home