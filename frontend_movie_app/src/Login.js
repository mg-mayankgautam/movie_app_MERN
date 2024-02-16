import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from './hook/useAuth';
import { useState } from 'react';

const Login = () => {
    const {setAuth}=useAuth();

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    
    

    const submitUser = async (e) => {
        e.preventDefault();
        console.log(Username,Password);

        try{const data = await axios.post('http://localhost:4700/login',{Username,Password})
            const bool = data.data
            if(bool){console.log(bool);
            const user = Username;
                setAuth({user});
            } 
            else if(!bool){console.log('nikal lawdei',bool);} 

            
        
  }
      catch(err){console.log(err);}}





  return (
    <>
    
    <form  onSubmit={submitUser}>
        <input
            placeholder='username'
            onChange={(e)=>setUsername(e.target.value)}
        />
        <input
            placeholder='username'
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
    </form>
    
    <Link to={`/signUp`}>
           
               new user? click to signup
               
            </Link>

   
    
     </>
  )
}

export default Login