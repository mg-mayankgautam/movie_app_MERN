import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../hook/useAuth';
import {Avatar} from '@mui/material';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useParams, Link, useLocation } from "react-router-dom";
import UserMovie from './UserMovie';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  /> )) ({ 
    '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 60,
    width: '100%',
    backgroundColor: '#f39a9a',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: '400',
    fontFamily:'Montserrat',
    alignItems: 'center',
    padding:'0',
    fontSize: '12px',
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);


const Profile = () => {

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => { setValue(newValue);}; //mui
  const { id } = useParams();
  const[UserName, setUserName] = useState('');
  const {auth, setAuth}= useAuth();
  const [UserMovies, setUserMovies] = useState([]);
  const [UserWL, setUserWL] = useState([]);
  
  // console.log(UserMovies, 'user movies')

  useEffect(() => {
        
    const verifyAuth = async ()=>{
        try {
            const URL =  `http://localhost:4700/isauth`;
            //console.log('url',URL);
            const response = await axios.get(URL);

            // console.log(response.data.auth);
           if(!response.data.auth){
           
                 
               console.log('auth')
               
               }


              else if(response.data.auth){
               
              //  console.log(response.data.auth);
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
    
    const getUserData = async()=>{
      try{
      const data = await axios.get(`http://localhost:4700/getuserdata?username=${id}`)
      console.log(data.data.watchlist, 'getuser data')

      setUserMovies(data.data.movieswatched);
      setUserWL(data.data.watchlist);
    } catch(e){console.log(e)}
    }


  getUserData();
  verifyAuth();
}, [])




  return (
    <div className='Profile'>
        <div className='userDetails'>
            <div className='userName'>
              <Avatar sx={{ width: 96, height: 96,display:'flex' ,justifyContent:'center', bgcolor:'transparent'}}><img src='https://cdn.britannica.com/76/156176-050-90A36E79/Martin-Scorsese-2008.jpg?w=400&h=300&c=crop' style={{height:'96px',width:'96px',objectFit:'cover'}}/></Avatar>
              {UserName}
            </div>
            <div className=''>
              <div className='filmsNumber'>{UserMovies && <div>{UserMovies.length}</div>}</div>
              <div style={{fontWeight: 200}}>FILMS</div>
            </div>
        </div>
        <div className='userNav'> 
          <TabContext value={value}>
            <StyledTabs onChange={handleChange} value={value}>
              <StyledTab label="FILMS" value="1"/>
              <StyledTab label="WATCHLIST" value="2"/>
              <StyledTab label="LISTS" value="3"/>

            </StyledTabs>

            <TabPanel value="1" sx={{p:0, display:'flex', flexWrap:'wrap'}}>
              <div className='userMovies'>
              {UserMovies.length ? (
                    UserMovies.map(Movie => (
                      <UserMovie Movie ={Movie} key={Movie.movie}/>
                    ))
                ) 
                
              : (
                 <p style={{ marginTop: "2rem" }}>
                        No movies to display.
                </p>
                )}
              </div>

            </TabPanel>

            <TabPanel value="2" sx={{p:0, display:'flex', flexWrap:'wrap'}}>
              <div className='userMovies'>
                {UserWL.length ? (
                      UserWL.map(Movie => (
                        <UserMovie Movie ={Movie} key={Movie.movie}/>
                      ))
                  ) 
                  
                : (
                  <p style={{ marginTop: "2rem" }}>
                          No movies to display.
                  </p>
                  )}
                </div>  
            </TabPanel>

            <TabPanel value="3" sx={{p:0, display:'flex', flexWrap:'wrap'}}>
              <div className='userMovies'>
                {UserWL.length ? (
                      UserWL.map(Movie => (
                        <UserMovie Movie ={Movie} key={Movie.movie}/>
                      ))
                  ) 
                  
                : (
                  <p style={{ marginTop: "2rem" }}>
                          NO LISTS TO DISPLAY
                  </p>
                  )}
                </div>  
            </TabPanel>
          </TabContext>
        </div>
        <div className='userFilms'>

        </div>
    </div>
  )
}

export default Profile