import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hook/useAuth';
import { useState } from 'react';
import image from './utils/login.png';



const Login = ({UserName,setUserName}) => {

    const [error, seterror] = useState(false)
    axios.defaults.withCredentials = true;
    const {setAuth}=useAuth();
    //const location = useLocation();
    const navigate = useNavigate();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [inputStyle, setinputStyle] = useState('');
    const [Style, setStyle] = useState({opacity:0});
    let { state } = useLocation();
    
    //console.log(state.prev);

    useEffect(()=>{

        if(error){
            setinputStyle('invalid');
        }
        else{
            setinputStyle('');
        }
        setStyle({opacity:1});
    
    }, [error])

    const submitUser = async (e) => {
        e.preventDefault();
       

        try{const data = await axios.post('http://localhost:4700/login',{Username,Password})
        //    console.log('/a/a/a',data);
            const axiosdata = data.data
           console.log('/a/a/a',axiosdata);
            if(!axiosdata){console.log('nikl loveday');
            seterror(true);
        }
            else{            const user = axiosdata.Username;
                setAuth({user});
                console.log('after login',user);
                setUserName(user);
                // navigate('/');
                
                navigate(`${state.prev.pathname}`)}
                // <Navigate to="/" state={{ from: location }} replace />
                
             
            // else if(!bool){console.log('nikal lawdei',bool);} 
        }

            
        
  
      catch(err){console.log(err);}}



  return (
    <>
    <div className='signupContainer' style={Style}>
      <img src={image} alt="" className='LoginBg' />

        <div className="Login"  >
        <h2>Login</h2> 
    
    <form  onSubmit={submitUser} className='LoginForm'>

        <input className={`Input ${inputStyle}`} type='text'    
            placeholder='username'
            onChange={(e)=>setUsername(e.target.value)}
        />
        <input className={`Input ${inputStyle}`} type='password'
            placeholder='password' 
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className='Submit'>Submit</button>

        {error?<p className='error'>Invalid Username or Password.</p>:<></>}
        
    </form>

    <Link to={`/signUp`} className='linktoLogin'>
           
               new user? click to signup
               
    </Link>
   
    
        </div>
    </div>
    </>
  )
}

export default Login