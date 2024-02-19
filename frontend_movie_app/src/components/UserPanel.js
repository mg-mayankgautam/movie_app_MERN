import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
import {Add, Star, Favorite, FavoriteBorder} from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


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
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    auth?.user
            ? 
    <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content', width: 220, boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

        <Box sx={{display:'flex', justifyContent:'space-evenly', width: '100%'}}>
            <Add sx={{color:'#f39a9a'}}/>
            <FavoriteBorder sx={{color:'#f39a9a'}}/>
        </Box>

        <Box sx={{ width: 222, display: 'flex', alignItems: 'center',}}>
            <Rating
                name="hover-feedback"
                defaultValue={1} size="large"
                value={value}
                precision={0.25}
                getLabelText={getLabelText}
                onChange={(event, newValue) => { setValue(newValue);
                }}
                onChangeActive={(event, newHover) => { setHover(newHover);
                }}
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
            <Box sx={{ ml: 2 }}> {labels[hover !== -1 ? hover : value]} </Box>
        )}
        </Box>
  
  </Box>
            
                
  : 

                // {/*  */}

  <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content', width: 220,  boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

        {/* <button onClick={<Navigate to="/login" state={{ from: location }} replace />}>
        Login to Rate, Review, Add!
        </button> */}
        <Link to="/login" state={{prev:location}} >Login to Rate, Review, Add!</Link>
            
        

  </Box>
  )
}

export default UserPanel