import React, { useEffect, useRef } from 'react';
import { useLocation} from "react-router-dom";
import useAuth from "../hook/useAuth";
import {Add, Star} from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddToQueueIcon from '@mui/icons-material/AddToQueue';
// import AddToQueueTwoToneIcon from '@mui/icons-material/AddToQueueTwoTone';
// import RemoveFromQueueOutlinedIcon from '@mui/icons-material/RemoveFromQueueOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios'
//import { flushSync } from 'react-dom'; 
import { useParams, Link } from "react-router-dom";



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
    <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', height:'max-content', width: 220, boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

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

        <Box sx={{ width: 220, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
  
  </Box>
            
                
  

                // {/*  */}

  // <Box sx={{p:2, bgcolor:'#ffffff15', display:'flex', alignItems:'center', flexDirection:'column', borderRadius:'8px', gap: '10px', justifyContent:'center',height:'max-content', width: 220,  boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>

  //       {/* <button onClick={<Navigate to="/login" state={{ from: location }} replace />}>
  //       Login to Rate, Review, Add!
  //       </button> */}
  //       <Box sx={{width:222, minHeight:50, display:'flex', alignItems:'center', gap: '10px', justifyContent:'center'}}>
          
  //       <Link to="/login" state={{prev:location}} >Login to Rate, Review, Add!</Link>
  //       </Box>
        

  // </Box>
  )
}

export default UserPanel