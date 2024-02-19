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


  return (<>
    <div className="signup">this is the SignUp page
    
    <form  onSubmit={submitNewUser}>
        <input className='Input' type='text'    
            placeholder='username'
            onChange={(e)=>setNewUsername(e.target.value)}
        />
        <input className='Input' type='password'
            placeholder='password' 
            onChange={(e)=>setNewPassword(e.target.value)}
        />
        <button type="submit" className='Submit'>Submit</button>
    </form>
    
    
    
    
 
    
    
    </div>

    </>
    
  )
}

export default SignUp