import React, { createRef } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from './utils/logo.png';
// import Requirelogin from '../Requirelogin';
import {Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import {Settings, Person, Movie, Theaters, Reviews, Diversity3, Logout, PlayCircle} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';


const Nav = ({UserName,setUserName}) => {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};



  //const [location, setlocation] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const {auth, setAuth}=useAuth();
  //const [UserName, setUserName] = useState('');
  const inputRef = createRef();
  
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "20px",
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.85),
      color:alpha(theme.palette.common.black, 0.85)
    },
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    // minHeight: "32px",
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    // minHeight: "32px",
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  

 
// console.log(UserName)

  useEffect(() => {
        
      
    const verifyAuth = async ()=>{
        try {
            const URL =  `http://localhost:4700/isauth`;
            //console.log('url',URL);
            const response = await axios.get(URL);

            // console.log(response.data.auth);
           if(!response.data.auth){
           
                 
           //    console.log('auth')
               
               }


              else if(response.data.auth){
               
                // console.log(response.data.auth);
               const user = response.data.auth;
               setAuth({user});
               setUserName(user);
              
              }   
       
     } catch (err) {
             if (err.response) {
               // Not in the 200 response range 
               console.log(err.response.data);
               console.log(err.response.status);
               console.log(err.response.headers);
             } else {
               console.log(`Error: ${err.message}`);
             }
     }
    }  
    
    

  verifyAuth();
}, [])


  const handleLogout = async() =>{
    console.log('logout');
    try{
      const data = await axios.post('http://localhost:4700/logout');
      // console.log(data)
      if(!data.data){
        // console.log('data.data',data.data)
      //  console.log('kuch ni aya',auth)
        const boo = data.data;
      setAuth('');
      setUserName('');
     // navigate(0)
    }
      //console.log(data);
      //console.log(auth);
             
    }
    catch(e){console.log(e)}
  }

const handleSubmitSearch = async(e)=>{
  e.preventDefault();
  const SearchValue= inputRef.current.value;
   console.log(SearchValue);

    const URL = `https://search.imdbot.workers.dev/?q=${SearchValue}`;

    // const results = await response.json;
    // console.log(results);
    fetch(URL)
    .then((res)=>{
        return res.json();
    })
    .then((resfromapi)=>{
       console.log(resfromapi);
       navigate(`/search/${SearchValue}`, {state: { searchData: resfromapi }});
       
     
       
      })  
  .catch((err)=> {console.log(err)})


  
}





  return (
    auth?.user
            ? 
    <div className='Nav'>
            <div className='Navitems'>
              <div>
              <Link to="/"><img src={logo} alt='Logo' className='logo' /></Link>
              </div>
            <ul className='navpages' >
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/films">FILMS</Link></li>
                <li><Link to="/blog">BLOG</Link></li>
                <li><Link to={`/profile/${auth.user}`}>PROFILE</Link></li>
            </ul>
   

            <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            {/* <form onSubmit={handleSubmitSearch}> */}
            {/* <StyledInputBase type='text' onChange={(e)=> setSearchValue(e.target.value)} /> */}
            <form onSubmit={handleSubmitSearch}>
              <StyledInputBase type='text' 
                inputRef={inputRef}
                placeholder=""
                inputProps={{ 'aria-label': 'search' }}
              /></form>
            {/* </form> */}
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap:'5px' }}>
            <Tooltip title="Your Menu">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{bgcolor:'#f39a9a'}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, textAlign:'center', bgcolor:'#f39a9a'}}><img src='https://cdn.britannica.com/76/156176-050-90A36E79/Martin-Scorsese-2008.jpg?w=400&h=300&c=crop' style={{height:'32px',width:'32px',objectFit:'cover'}}/></Avatar>
              </IconButton>
            </Tooltip>
            <Typography sx={{fontSize:'small'}}>{UserName}</Typography>
          </Box>

          <Menu
            anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
            PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                '& .MuiAvatar-root': {width: 32, height: 32, ml: -0.5, mr: 1,},
                '&::before': {content: '""',display: 'block', position: 'absolute', top: 0, right: 14,width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,},},
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Person fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Movie fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Films
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Reviews fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Reviews
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><PlayCircle fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                WatchList
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Theaters fontSize="small" sx={{color:'#f39a9a'}} /></ListItemIcon>
                Lists
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Diversity3 fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Network
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem> */}
            <Divider />
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Settings fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon><Logout fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Logout
            </MenuItem>
      </Menu>


          </div>
    </div>

:

    <div className='Nav'>
            <div className='Navitems'>
              <div>
              <Link to="/"><img src={logo} alt='Logo' className='logo' /></Link>
              </div>
            <ul className='navpages' >
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/films">FILMS</Link></li>
                {/* <li><Link to="/addpost">POST</Link></li> */}
                <li>
                  {/* <Requirelogin> */}
  
                  <Link to="/login" state={{prev:location}} >LOGIN</Link>
                  {/* </Requirelogin> */}
                </li>
                {/* <li><Link to="/about">ABOUT</Link></li> */}
            </ul>

    

            <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <form onSubmit={handleSubmitSearch}>
              <StyledInputBase type='text' 
                inputRef={inputRef}
                placeholder=""
                inputProps={{ 'aria-label': 'search' }}
              /></form>
          </Search>
          </div>
    </div>
              

  )
}

export default Nav