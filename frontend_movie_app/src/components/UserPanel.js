import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
import {Add, Star, Favorite, FavoriteBorder} from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AddToQueueTwoToneIcon from '@mui/icons-material/AddToQueueTwoTone';
import RemoveFromQueueOutlinedIcon from '@mui/icons-material/RemoveFromQueueOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { flushSync } from 'react-dom'; 



const labels = {
    0.25: 'kyu hi-',
    0.5: 'kyu hi',
    0.75: 'kyu',
    1: 'Useless',
    1.25:'poor',
    1.5: 'poor',
    1.75:'eh',
    2: 'eh',
    2.25:'ok',
    2.5: 'oki',
    2.75:'okie',
    3: 'good',
    3.25:'good+',
    3.5: 'nice',
    3.75:'oOoH',
    4: 'oOohH',
    4.25:'oolala',
    4.5: 'damn',
    4.75:'damnn',
    5: 'mindblo',
  };
  
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }



const UserPanel = () => {

  const { auth } = useAuth();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [isActive, setIsActive] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);

  // const reversestate=async(value)=>{
  //   const opp=!value;
  //   setIsActive2(opp);
  //   console.log(isActive2);
    
  // }


  const handleWatched =async()=>{
    console.log('watched clicked',isActive2);

    // flushSync(()=>{
      setIsActive2(isActive2 => !isActive2);
    // })
    
    console.log('state changed????',isActive2);

    // const data = await axios.post('http://localhost:4700/addwatched', {watched: isActive2})
  }

  console.log('outside funcn',isActive2);


  useEffect(()=>{

    const postWatchStatus=async()=>{
      console.log('happens after click event completes',isActive2);
  
      // const data = await axios.post('http://localhost:4700/addwatched', {watched: isActive2})
    }
    postWatchStatus();
  },[isActive2]);

  //my temporary soln^^^^

  


  return (
    auth?.user
            ? 
    <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content', width: 220, boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

        <Box sx={{display:'flex', justifyContent:'space-evenly', width: '100%'}}>
            {/* <Add sx={{color:'#f39a9a'}} onClick={handleWatched}/> */}
            <div onClick={()=> handleWatched()}>
                {isActive2 ? 
                <VisibilityIcon sx={{color:'#f39a9a', width:'1.5em', height:'1.5em', cursor:'pointer'}}/>
                : 
                <VisibilityOutlinedIcon sx={{color:'white', width:'1.5em', height:'1.5em', cursor:'pointer'}}/> 
                }
            </div>
            <div onClick={()=> setIsActive(!isActive)}>
                {isActive ? 
                <PlaylistAddCheckOutlinedIcon sx={{color:'#f39a9a', width:'1.5em', height:'1.5em', cursor:'pointer'}}/>
                : 
                <PlaylistAddOutlinedIcon sx={{color:'#white', width:'1.5em', height:'1.5em', cursor:'pointer'}}/> 
                }
            </div>
        </Box>

        <Box sx={{ width: 222, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Rating
                name="hover-feedback"
                size="large"
                value={value}
                precision={0.25}
                getLabelText={getLabelText}
                // sx={{color: '#f39a9a'}}
                onChange={(event, newValue) => { setValue(newValue);
                }}
                onChangeActive={(event, newHover) => { setHover(newHover);
                }}
                emptyIcon={<Star style={{ opacity: 0.40, color:'white'}} fontSize="inherit" />}
            />
            {/* {value !== null && (
            <Box sx={{ ml: 2 }}> {labels[hover !== -1 ? hover : value]} </Box>
        )} */}
        </Box>
  
  </Box>
            
                
  : 

                // {/*  */}

  <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', justifyContent:'center',height:'max-content', width: 220,  boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

        {/* <button onClick={<Navigate to="/login" state={{ from: location }} replace />}>
        Login to Rate, Review, Add!
        </button> */}
        <Box sx={{width:222, minHeight:50, display:'flex', alignItems:'center', gap: '10px', justifyContent:'center'}}>
          
        <Link to="/login" state={{prev:location}} >Login to Rate, Review, Add!</Link>
        </Box>
        

  </Box>
  )
}

export default UserPanel