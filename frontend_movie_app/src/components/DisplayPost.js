import React from 'react'
import useAuth from '../hook/useAuth';
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import UserPanel from './UserPanel';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import RequireAuth from '../RequireAuth';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  /> )) ({ 
    '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#f39a9a',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    alignItems: 'baseline',
    padding:'0',
    fontSize: theme.typography.pxToRem(15),
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



const DisplayPost = ({posts}) => {
  const {setAuth,auth}=useAuth();
  const location = useLocation();
  
  useEffect(() => {
   // const https = require('https')
// const SUBSCRIPTION_KEY = '05490cd5747c46dca9afff0183e9a92f';

// function bingWebSearch(query) {
//  const https.get({
//     hostname: 'api.bing.microsoft.com',
//     path:     '/v7.0/search?q=' + encodeURIComponent(query),
//     headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
//   }, res => {
//     let body = ''
//     res.on('data', part => body += part)
//     res.on('end', () => {
//       for (var header in res.headers) {
//         if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
//           console.log(header + ": " + res.headers[header])
//         }
//       }
//       console.log('\nJSON Response:\n')
//       console.dir(JSON.parse(body), { colors: false, depth: null })
//     })
//     res.on('error', e => {
//       console.log('Error: ' + e.message)
//       throw e
//     })
//   })
// }
// const query = 'Microsoft Bing Search Services'
// bingWebSearch(query)
  
  },[]);
  // console.log('setAuth',auth);

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => { setValue(newValue);};

  const [moviename, setmoviename] = useState('')
  const [Plot, setPlot] = useState('')
  const [Release_date, setRelease_date] = useState('')
  const [Runtime, setRuntime] = useState('')
  const [MoviePoster, setMoviePoster] = useState('')
  const [actors, setactors] = useState('');
  const [Directors, setDirectors] = useState('');
  const [Genres, setGenres] = useState('');
  const [AvgRating, setAvgRating] = useState('');
  const [totalWatched, setTotalWatched] = useState('');
  const [LifetimeGross, setLifetimeGross] = useState('');
  const [WorldwideGross, setWorldwideGross] = useState('');
  const [OpeningWeekendGross, setOpeningWeekendGross] = useState('');
  const [AddedDate, setAddedDate] = useState('');


  const { id } = useParams();
  // const post = posts.find(post => (post.id).toString() === id);



useEffect(() => {
    const getmoviedata = async () => {
        try {
               const URL =  `http://localhost:4700/movie?id=${id}`;
               //console.log('url',URL);
               const response = await axios.get(URL);

                console.log(response);
               if(!response.data.auth){
                    setmoviename(response.data.name)
                    setPlot(response.data.plot.plainText)
                    setRelease_date(response.data.release_date)
                    setRuntime(response.data.runtime)
                    setMoviePoster(response.data.url)
                    setactors(response.data.allcast)
                    setDirectors(response.data.director)
                    setGenres(response.data.genres.genres)
                    const totalStars = response.data.movierating.totalStars;
                    const totalRatedBy =response.data.movierating.totalRatedBy;
                    if(totalRatedBy!=0){
                      const Avg=(totalStars/totalRatedBy)
                      console.log(Avg, AvgRating)
                      setAvgRating(Avg);
                    }
                    setTotalWatched(response.data.totalwatched)
                  }


                 else if(response.data.auth){
                  
                  // console.log(response.data.auth);
                  const user = response.data.auth;
                  setAuth({user});
                  setmoviename(response.data.name)
                    setPlot(response.data.plot.plainText)
                    setRelease_date(response.data.release_date)
                    setRuntime(response.data.runtime)
                    setMoviePoster(response.data.url)
                    setactors(response.data.allcast)
                    setDirectors(response.data.director)
                    setGenres(response.data.genres.genres)
                    const totalStars = response.data.movierating.totalStars;
                    const totalRatedBy =response.data.movierating.totalRatedBy;
                    if(totalRatedBy!=0){
                      const Avg=(totalStars/totalRatedBy)
                      // console.log(Avg)
                      setAvgRating(Avg);
                    }
                    setTotalWatched(response.data.totalwatched)
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
  
   

  getmoviedata();
 
},[])

useEffect(()=>{
 
  const getBoxOfficeData = async () => {
    try {
          const URL =  `http://localhost:4700/boxoffice?id=${id}`;
           
          const response = await axios.get(URL);

          console.log(response.data);
          setLifetimeGross(response.data.lifetimeGross)
          setWorldwideGross(response.data.worldwideGross)
          setOpeningWeekendGross(response.data.openingWeekendGross)
          setAddedDate(response.data.addedDate)

           
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



  getBoxOfficeData();

},[moviename]);
//line 270
 //console.log(actors);

  return ( 
 
     <>
 {moviename?
  (<main className='DisplayPost'>

    <article className='MainPoster'>
      {/* <Link to={`/post/${post.id}`}> */}
        <img src={MoviePoster} alt="poster"  className='movieImg' />
        {/* </Link> */}
        <section>Avg Stars: {AvgRating}, Views: {totalWatched}</section>
    </article>

    <article className='AboutMovie'>

      <section className='movieInfo'>
          <div className='movieTitle'>{moviename.text}</div>
          <div>{Release_date.year}</div>
          <div className='directors'>
               <p> Directed By: </p>
                
                {Directors &&
                Directors.map(director => (
                        <p key={crypto.randomUUID()}>{director.name}</p>
                  ))
                  
                  }
                  {/* {Directors && Directors[0].name} */}
          </div>
      </section>

  <section className='movieAllinfo'>
      <div>
        <div className='moviePlot'>{Plot}</div>
        <p>{Runtime}</p>

              <div className='CastGenre'>

              <TabContext value={value}>
                <StyledTabs onChange={handleChange} value={value}>
                  <StyledTab label="CAST" value="1"/>
                  <StyledTab label="GENRE" value="2"/>
                </StyledTabs>
                <TabPanel value="1" sx={{p:0, display:'flex', flexWrap:'wrap'}}>
                        {actors && actors.map(actor => ( 
                        <div className='castname' key={crypto.randomUUID()}>
                          
                         <Link to={`/actor/${actor.node.name.id}`}> 
                         {actor.node.name.nameText.text}
                         </Link>
                        
                        </div>))} 
                </TabPanel>
                <TabPanel value="2" sx={{p:0, display:'flex', flexWrap:'wrap'}}>
                        {Genres && Genres.map(Genre => ( <div className='genrename' key={Genre.id}>{Genre.text}</div>))}
                </TabPanel>
             </TabContext>
              

            
        
            
                    {/* <div>
                       
                    </div>
                    <div>
                        Genres: 
                         
                    </div> */}
        </div>
      </div>

      <div className="sidePanel">
            {auth?.user
            ? 
              <UserPanel moviename={moviename} Release_date={Release_date}  MoviePoster={MoviePoster} Directors={Directors}/>
            :
                <div className='PanelnotLogin'>
                  <div className='PanelnotLoginDiv'>
                    <Link to="/login" state={{prev:location}} >Login to Rate, Review, Add!</Link>
                  </div>
                </div>
            }

          <div className='PanelnotLogin'>
              <div className='PanelnotLoginDiv'>
                    <p>BOX OFFICE!</p>
                    <div>lifetime: $ {LifetimeGross}</div>
                    <div>worldwide: $ {WorldwideGross}</div>
                    <div>opening wknd: $ {OpeningWeekendGross}</div>
                    <div>updated on: {AddedDate}</div>
              </div>
          </div>
      </div>
  </section>
</article>


  
</main>)
  :(                 <Stack spacing={3}>
    <br></br>
    {/* For variant="text", adjust the height via font-size */}
    <Skeleton variant="text" sx={{ fontSize: 'rem' }} />
   
    <Skeleton variant="circular" width={80} height={80}sx={{ bgcolor: 'grey.900' }} />
    <Skeleton variant="rectangular" width={210} height={60}sx={{ bgcolor: 'grey.900' }} />
    <Skeleton variant="rounded" width={1000} height={300} sx={{ bgcolor: 'grey.900' }}/>
  </Stack>

 
  // <Skeleton variant="circular" width={40} height={40} />
  // <Skeleton variant="rectangular" width={210} height={60} />
  // <Skeleton variant="rounded" width={210} height={60} />
  )
}
     </>
  )
}

export default DisplayPost