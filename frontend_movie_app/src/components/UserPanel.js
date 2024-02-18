import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
// import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
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
    <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content'}}>

        <Box sx={{display:'flex', justifyContent:'space-evenly', width: '100%'}}>
            <AddIcon sx={{color:'#f39a9a'}}/>
            <FavoriteBorderIcon sx={{color:'#f39a9a'}}/>
        </Box>

        <Box sx={{ width: 220, display: 'flex', alignItems: 'center',}}>
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
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
            <Box sx={{ ml: 2 }}> {labels[hover !== -1 ? hover : value]} </Box>
        )}
        </Box>
  
  </Box>
            
                
  : 

                // {/*  */}

  <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content'}}>

        {/* <button onClick={<Navigate to="/login" state={{ from: location }} replace />}>
        Login to Rate, Review, Add!
        </button> */}
        <Link to="/login"  replace>
            Login to Rate, Review, Add!
        </Link>

  </Box>
  )
}

export default UserPanel