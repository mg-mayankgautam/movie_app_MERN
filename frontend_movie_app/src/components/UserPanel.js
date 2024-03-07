import React, { useEffect, useRef } from 'react';
import { useLocation} from "react-router-dom";
import useAuth from "../hook/useAuth";
import {Add, Star} from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, TextField } from '@mui/material';


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



const UserPanel = (props) => {

  const { auth } = useAuth();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [isActive, setIsActive] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);
  const [style, setStyle] = React.useState({display: 'none'});
  const [style2, setStyle2] = React.useState({display: 'block'});
  const [style3, setStyle3] = React.useState({display: 'none'});
  const [style4, setStyle4] = React.useState({display: 'block'});
  const { id } = useParams();
  const StarRating = useRef(0);
  const [open, setOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState('1');
  const handleChange = (event, newValue) => { setTabValue(newValue);};

  const [alignment, setAlignment] = React.useState('web');

  const handleChangee = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };  
  
  const handleWatched =async()=>{

    // console.log('watched clicked',!isActive2);

    // flushSync(()=>{
     // setIsActive2(isActive2 => !isActive2);
    // })
    try{
    const data = await axios.post('http://localhost:4700/addwatched', {watched: !isActive2,movie:id, moviename: props.moviename.text, releasedate: props.Release_date.year, movieposter: props.MoviePoster, director: props.Directors})
      
    // console.log(data);

    setIsActive2(isActive2 => data.data.watched)

      if(data.data.watched === false){
        StarRating.current = 0;
        setValue(0)
      }
  }
    catch(e){console.log(e)}
  }

  const handleRating =async(valuee)=>{
    // console.log(valuee, 'zero?')
    if(0<=valuee<=5){
    StarRating.current = valuee;
    // setValue(valuee);

    try{
      
      console.log('rating',StarRating.current);
      const data = await axios.post('http://localhost:4700/addrating', {rating: StarRating.current, movie: id, moviename: props.moviename.text, releasedate: props.Release_date.year, movieposter: props.MoviePoster, director: props.Directors})
      
      console.log(data, 'post rating data');
      setIsActive2(isActive2 => data.data.watched);
      setValue(data.data.userrating);
  
    }
    catch(e){console.log(e)}
    }
  }

  const handleWatchlist =async()=>{
    //  setIsActive(!isActive)
    try{
     const data = await axios.post('http://localhost:4700/addwatchlist', {watchlist: !isActive,movie:id, moviename: props.moviename.text, releasedate: props.Release_date.year, movieposter: props.MoviePoster, director: props.Directors})

    //  console.log(data, 'watchlist post data');
     setIsActive(data.data.watchlist);
    }
    catch(e){console.log(e)}; 
  } 

  useEffect(()=>{

    const getWatched=async()=>{
      try{
       const data = await axios.get('http://localhost:4700/getwatched', {params:{movie: id}});
        console.log(data, ' data: get watched func')
       const state = data.data.watched;
        setIsActive2(state);
        // console.log(data.data.userrating)
        if(data.data.userrating){
          const rating= data.data.userrating
          StarRating.current = rating;
          setValue(rating);
        }
      }
      catch(err){console.log(err);}
        // if(data.data.WL.length >= 1)setIsActive(true)
       
    }
    getWatched();
  
  },[]);

//console.log(isActive)
//  useEffect(async()=>{
//   console.log(isActive)

//  },[isActive]);


  return (
    // auth?.user
    //         ? 
    <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content', width: 200, boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

        <Box sx={{display:'flex', justifyContent:'space-evenly', width: '100%'}}>
            
            <div onClick={()=> handleWatched()}>
                {isActive2 ? 
                <div className='watchedicondiv' 
                onMouseEnter={e => { setStyle({display: 'block'}); setStyle2({display: 'none'})}}
                onMouseLeave={e => { setStyle({display: 'none'}); setStyle2({display: 'block'})}}>
                  <VisibilityIcon sx={{color:'#f39a9a', width:'1.5em', height:'1.5em', cursor:'pointer'}}/>
                  <div style={style2}>watched</div>
                  <div style={style}>remove</div>
                </div> 
                : <div className='watchedicondiv'>
                  <VisibilityOutlinedIcon sx={{color:'white', width:'1.5em', height:'1.5em', cursor:'pointer'}}/> 
                  <div>watch</div>
                </div>
                }
            </div>

            <div onClick={()=> handleWatchlist()}>
             {isActive ? 
              <div className='watchedicondiv' 
              onMouseEnter={e => { setStyle3({display: 'block'}); setStyle4({display: 'none'})}}
              onMouseLeave={e => { setStyle3({display: 'none'}); setStyle4({display: 'block'})}}>
                <PlaylistAddCheckOutlinedIcon sx={{color:'#f39a9a', width:'1.5em', height:'1.5em', cursor:'pointer'}}/>
                <div style={style4}>added</div>
                <div style={style3}>remove</div>
              </div> 
              : <div className='watchedicondiv'>
                <PlaylistAddOutlinedIcon sx={{color:'#white', width:'1.5em', height:'1.5em', cursor:'pointer'}}/>  
                <div>+ watchlist</div>
              </div>
              }
                {/* {isActive ? 
                <PlaylistAddCheckOutlinedIcon sx={{color:'#f39a9a', width:'1.5em', height:'1.5em', cursor:'pointer'}}/>
                : 
                <PlaylistAddOutlinedIcon sx={{color:'#white', width:'1.5em', height:'1.5em', cursor:'pointer'}}/> 
                } */}
            </div>
        </Box>

        <Box sx={{ width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ClearIcon onClick={()=> handleRating(0)} sx={{cursor:'pointer'}}/>
            <Rating
                name="hover-feedback"
                size="large"
                // inputref={StarRating}
                value={StarRating.current}
                precision={0.25}
                getLabelText={getLabelText}
                sx={{fontSize:'2.5rem'}}
                onChange={(event, newValue) => { 
                  // handleWatched();
                  handleRating(newValue);
                }}
                onChangeActive={(event, newHover) => { 
                  setHover(newHover);
                  // StarHover.current = newHover;
                }}
                emptyIcon={<Star style={{ opacity: 0.30, color:'white'}} fontSize='inherit' />}
            />
            {/* {value !== null && (
            <Box sx={{ ml: 2 }}> {labels[hover !== -1 ? hover : value]} </Box>
        )} */}
        </Box>

        <Box sx={{ width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           
                     
        <>
            <Button onClick={handleClickOpen}>
              Add to lists...
            </Button>
            <Dialog 
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              transitionDuration={1}
              // sx={{width:'600px'}}
            >
              <DialogTitle sx={{ m: 0, p: 2, fontFamily:'Montserrat', bgcolor:'rgb(23, 29, 57)', color:"white"}}id="customized-dialog-title" >
                      Add Movie to List:
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <TabContext value={tabValue}>

                <Tabs onChange={handleChange} value={tabValue} centered sx={{fontFamily:'Montserrat', bgcolor:'rgb(23, 29, 57)'}}>
                  <Tab label="Private" value="1" sx={{width:'250px',height:'10px' ,fontFamily:'Montserrat', color:'white'}}/>
                  <Tab label="Public" value="2" sx={{width:'250px',height:'10px' ,fontFamily:'Montserrat', color:'white'}}/>
                </Tabs>
                              
                <TabPanel value="1" sx={{p:0, bgcolor:'rgb(23, 29, 57)',fontFamily:'Montserrat', color:'white'}}>
                    <DialogContent dividers sx={{display:'flex', gap:'15px', flexDirection:'column'}}>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box gutterBottom sx={{display:'flex', alignItems:'center'}}><AddIcon/>New List</Box> 
                        <Box sx={{display:'flex', alignItems:'center'}}><InputBase sx={{color:'white', align:'right'}}/><SearchIcon/></Box>
                      </Box>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>Hard Hitting Dramas</Box><Box>25 films</Box>
                      </Box>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>Hard Hitting Dramas</Box><Box>25 films</Box>
                      </Box>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>Hard Hitting Dramas</Box><Box>25 films</Box>
                      </Box>

                    </DialogContent>
                </TabPanel>

                <TabPanel value="2" sx={{p:0, bgcolor:'rgb(23, 29, 57)',fontFamily:'Montserrat', color:'white'}}>
                <DialogContent dividers sx={{display:'flex', gap:'15px', flexDirection:'column'}}>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box gutterBottom sx={{display:'flex', alignItems:'center'}}><AddIcon/>New List </Box> 
                        <Box sx={{display:'flex', alignItems:'center'}}><InputBase sx={{color:'white', align:'right'}}/><SearchIcon/></Box>
                      </Box>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>Hard Hitting Dramas</Box><Box>25 films</Box>
                      </Box>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>Hard Hitting Dramas</Box><Box>25 films</Box>
                      </Box>
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>Hard Hitting Dramas</Box><Box>25 films</Box>
                      </Box>

                      <Typography gutterBottom sx={{fontFamily:'Montserrat', color:'white'}}>
                        
                      </Typography>
                    </DialogContent>
                </TabPanel>
             </TabContext>
             <DialogActions sx={{bgcolor:'rgb(23, 29, 57)', color:'white'}}>
                <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button>
              </DialogActions>
            </Dialog>
          </>
            
        </Box>
  
  </Box>
            
                
  )
}

export default UserPanel