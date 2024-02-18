import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from './utils/logo.png';
// import Requirelogin from '../Requirelogin';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Logout from '@mui/icons-material/Logout';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
  //const [location, setlocation] = useState();

   const location = useLocation()
   console.log(location.pathname);
  const {auth}=useAuth();

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "20px",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};


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
                <li><Link to="/addpost">WATCHLIST</Link></li>
                <li><Link to="/about">PROFILE</Link></li>
            </ul>
   

            <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder=""
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onMouseOver={handleClick}
                size="small"
                sx={{bgcolor:'#f39a9a'}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, textAlign:'center', bgcolor:'#f39a9a'}}></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose}MenuListProps={{ onMouseLeave: handleClose }} 
            PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                '& .MuiAvatar-root': {width: 32, height: 32, ml: -0.5, mr: 1,},
                '&::before': {content: '""',display: 'block', position: 'absolute', top: 0, right: 14,width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,},},
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><PersonIcon fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><MovieIcon fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Films
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><ReviewsIcon fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                Reviews
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><PlayCircleIcon fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
                WatchList
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><TheatersIcon fontSize="small" sx={{color:'#f39a9a'}} /></ListItemIcon>
                Lists
            </MenuItem>
            <MenuItem onClick={handleClose}> 
                <ListItemIcon><Settings fontSize="small" sx={{color:'#f39a9a'}}/></ListItemIcon>
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
            <MenuItem onClick={handleClose}>
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
                <li><Link to="/addpost">POST</Link></li>
                <li>
                  {/* <Requirelogin> */}
  
                  <Link to="/login" state={{prev:location}} >LOGIN</Link>
                  {/* <Link to={{ pathname: "/courses", state: { fromDashboard: true } }} /> */}
                  {/* </Requirelogin> */}
                </li>
                <li><Link to="/about">ABOUT</Link></li>
            </ul>

    

            <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder=""
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </div>
    </div>
              

  )
}

export default Nav