import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hook/useAuth';
import { useState } from 'react';
// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import FormHelperText from '@mui/material/FormHelperText';

// function MyFormHelperText() {
//     const { focused } = useFormControl() || {};
  
//     const helperText = React.useMemo(() => {
//       if (focused) {
//         return 'This field is being focused';
//       }
  
//       return 'Helper text';
//     }, [focused]);
  
//     return <FormHelperText>{helperText}</FormHelperText>;
//   }



const Login = ({UserName,setUserName}) => {

    const [error, seterror] = useState(false)
    axios.defaults.withCredentials = true;
    const {setAuth}=useAuth();
    //const location = useLocation();
    const navigate = useNavigate();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    let { state } = useLocation();
    
    //console.log(state.prev);

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
    <div className="Login"  > 
    
    <form  onSubmit={submitUser} >
        {/* <FormControl sx={{ width: '25ch' }}>

            <TextField placeholder='username' onChange={(e)=>setUsername(e.target.value)} sx={{ color:'white', outline: 'none',
            "& .MuiOutlinedInput-notchedOutline" : { borderColor : "white",},
            "&:hover > .MuiOutlinedInput-notchedOutline" : {    borderColor : "#F39A9A"},
            "&:focus > .MuiOutlinedInput-notchedOutline" : { borderColor : "#F39A9A"}
            }}/>

            <MyFormHelperText />
        </FormControl>
        <FormControl sx={{ width: '25ch' }}>
            <OutlinedInput placeholder='password' onChange={(e)=>setPassword(e.target.value)} sx={{color:'white'}} />
            <MyFormHelperText />
        </FormControl> */}

        <input className='Input' type='text'    
            placeholder='username'
            onChange={(e)=>setUsername(e.target.value)}
        />
        <input className='Input' type='password'
            placeholder='password' 
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className='Submit'>Submit</button>
        
    </form>
    
    {error?<p>nikl loveday</p>:<></>}
    <Link to={`/signUp`}>
           
               new user? click to signup
               
    </Link>

   
    
     </div>
  )
}

export default Login