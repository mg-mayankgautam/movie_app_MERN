import React from 'react'
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
// import { sizing } from '@material-ui/system';
import logo from './utils/logo.png';

const Nav = () => {
// console.log(logo);
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
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
  
  return (
    
    <div className='Nav'>
            <div className='Navitems'>
              <div>
              <Link to="/"><img src={logo} alt='Logo' className='logo' /></Link>
              </div>
            <ul className='navpages' >
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/addpost">POST</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
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