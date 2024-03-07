import React from 'react';
import axios from 'axios';
import { useState,useRef,useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// const USER_SIGNUP = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_SIGNUP = /^[a-zA-Z0-9][a-zA-Z0-9-_]{8,23}$/;

const SignUp = () => {
  const navigate = useNavigate();
    //const [NewUsername, setNewUsername] = useState('');
   // const [NewPassword, setNewPassword] = useState('');

const USER_REGEX = /^[A-z]/;
const USER2_REGEX = /^[a-zA-Z0-9]{4,10}/;//lower limit
const USER3_REGEX = /[a-zA-Z0-9_#!$^&*\s]{10}/;//upperlimit
const USER4_REGEX = /[^a-zA-Z0-9_#!$^&*\s]/;//specials chars
const USER5_REGEX = /[\s]/;//space

const PASS_REGEX = /^[a-zA-Z0-9_`~(){}#!%@$^&*\s\]\[\\\/+:;"'<>,.?=|-]{6,10}$/;


  const userRef = useRef();
  const errRef = useRef();
    
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [validName2, setValidName2] = useState(false);
  const [validName3, setValidName3] = useState(false);
  const [validName4, setValidName4] = useState(false);
  const [validName5, setValidName5] = useState(false);

  const [userfromDB, setUserfromDB] = useState(false);


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
    const result4 = USER4_REGEX.test(user);
    const result5 = USER5_REGEX.test(user);


    //console.log(result,result2,result3);
    console.log(result,result2,!result3,!result4,!result5);

    setValidName(result);
    setValidName2(result2);
    setValidName3(result3);
    setValidName4(!result4);
    setValidName5(!result5);


    


  }, [user])


  useEffect(() => {

     const result = PASS_REGEX.test(pwd);
   

    console.log(result);
    // console.log(result,result2,!result3,!result4,!result5);

    setValidPwd(result);
    


    


  }, [pwd])
// const validate =async()=>{
//   console.log('axios');
//   const Username=user;
//   try{const valid = await axios.post('http://localhost:4700/checkusername',{Username})
//   console.log(valid.data);
//   setUserfromDB(valid.data.user)
//   }
//   catch(err){console.log(err);}

// }  

useEffect(()=>{
  
  const validate =async()=>{
    console.log('axios');
    const Username=user;
    try{const valid = await axios.post('http://localhost:4700/checkusername',{Username})
    console.log(valid.data);
    setUserfromDB(valid.data.user)
    }
    catch(err){console.log(err);}
  
  }  

  if(validName && validName2 && !validName3 && validName4 && validName5  ){
  console.log('axios');
  validate();
  }
},[user])
// if(validName && validName2 && !validName3 && validName4 && validName5  ){
//   console.log('axios');
//   validate();
// }

    const submitNewUser = async (e) => {
        e.preventDefault();


        //console.log(NewUsername,NewPassword);
        const Username=user;
        const Password=pwd;

      if(user && pwd && !userfromDB && validPwd ){ 
        console.log('sub,it succeess')
        try{
          const data = await axios.post('http://localhost:4700/signup',{Username,Password})
      
          console.log(data.data);
          if(data.data){
            navigate(`/login`)

          }
      }
      catch(err){console.log(err);}
     }
      
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

          {user && userfromDB && validName && validName2 && !validName3 && validName4 && validName5?   (<p>
          user exists
          </p>):<></>}          
          {user && !userfromDB && validName && validName2 && !validName3 && validName4 && validName5?   (<p>
            username available
          </p>):<></>}
          {user && !validName?   (<p>
          username must start with a letter
          </p>):<></>}
          {user && !validName2?   (<p>        
          username must be more than 4 chars</p>):<></>}
          {user && validName3?   (<p>
          username cant be more than 10</p>):<></>}
          {user  && !validName4?   (<p>          
          username cant have @,(,),
          </p>):<></>}
          {user  && !validName5?   (<p>
          username cant have space          
          </p>):<></>}


        <input 
            className='Input' type='password'
            placeholder='password' 
            onChange={(e)=>setPwd(e.target.value)}  
            // ref={userRef}
            autoComplete='off'
            required
            // onFocus={() => setUserFocus(true)}
            // onBlur={() => setUserFocus(false)}
        />
         {pwd  && !validPwd?   (<p>
          pwd must be between 6-10 letters        
          </p>):<></>}

        <button type="submit" className='Submit'>Submit</button>
    </form>
    
    <Link to={`/login`}>
           
              click to login
               
    </Link>
    
    
 
    
    
    </div>

    
  )
}

export default SignUp