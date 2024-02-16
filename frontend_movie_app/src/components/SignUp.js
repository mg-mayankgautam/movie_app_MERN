import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const SignUp = () => {

    const [NewUsername, setNewUsername] = useState('');
    const [NewPassword, setNewPassword] = useState('');

    
    

    const submitNewUser = async (e) => {
        e.preventDefault();
        console.log(NewUsername,NewPassword);
        const Username=NewUsername;
        const Password=NewPassword;
        try{const data = await axios.post('http://localhost:4700/signup',{Username,Password})
      
  console.log(data);
  }
      catch(err){console.log(err);}

  

        
        

    };


  return (
    <>this is the SignUp page
    
    <form  onSubmit={submitNewUser}>
        <input
            placeholder='username'
            onChange={(e)=>setNewUsername(e.target.value)}
        />
        <input
            placeholder='username'
            onChange={(e)=>setNewPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
    </form>
    
    
    
    
 
    
    
    </>


    
  )
}

export default SignUp