import React from 'react';
import axios from 'axios';
import { useState,useRef,useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// const USER_SIGNUP = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_SIGNUP = /^[a-zA-Z0-9][a-zA-Z0-9-_]{8,23}$/;

const SignUp = () => {

    //const [NewUsername, setNewUsername] = useState('');
    const [NewPassword, setNewPassword] = useState('');

const USER_REGEX = /^[a-zA-Z]/;
const USER2_REGEX = /[A-z0-9_]{5,10}/;
const USER3_REGEX = /[A-z0-9_]{10}/;

  const userRef = useRef();
  const errRef = useRef();
    
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {

    const result = USER_REGEX.test(user);
    const result2 = USER2_REGEX.test(user);
    const result3 = USER3_REGEX.test(user);
    //console.log(result,result2,result3);
    console.log(result,result2,!result3);

   // setValidName(result);

    


  }, [user])

// const validate =async()=>{
//     console.log('axios');
//     const Username=user;
//   try{const valid = await axios.post('http://localhost:4700/checkusername',{Username})
// console.log(valid.data);
// }
// catch(err){console.log(err);}
// }  

// if(validName){
//   validate();
// }

    const submitNewUser = async (e) => {
        e.preventDefault();

        //console.log(NewUsername,NewPassword);
        const Username=user;
        const Password=NewPassword;

        try{
          const data = await axios.post('http://localhost:4700/signup',{Username,Password})
      
          console.log(data);
      }
      catch(err){console.log(err);}
    };


  return (
    <div className="signup">this is the SignUp page
    
    <form  onSubmit={submitNewUser}>
        <input className='Input'
               type='text'    
               placeholder='username'
               onChange={(e)=>setUser(e.target.value)}
               ref={userRef}
               autoComplete='off'
               required
               onFocus={() => setUserFocus(true)}
               onBlur={() => setUserFocus(false)}
        />

        {user && !validName?   (<p>
          username must start with a letter
          username must be more than 4 chars</p>):<></>}



        <input className='Input' type='password'
            placeholder='password' 
            onChange={(e)=>setNewPassword(e.target.value)}
        />
        <button type="submit" className='Submit'>Submit</button>
    </form>
    
    <Link to={`/login`}>
           
              click to login
               
    </Link>
    
    
 
    
    
    </div>

    
  )
}

export default SignUp