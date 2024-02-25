
import './App.css';
import Addpost from './components/Addpost';
import About from './components/About';
import DisplayPost from './components/DisplayPost';
import Home from './components/Home';
import Login from './components/Login';
import axios from 'axios';
import Layout from './Layout';
import SignUp from './components/SignUp';
import SearchResults from './components/SearchResults';
import RequireAuth from './RequireAuth';
import RequireloginAuth from './RequireloginAuth';
import Actors from './components/Actors';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Profile from './components/Profile';
import Films from './components/Films';






function App() {
  axios.defaults.withCredentials = true;
  // axios.defaults.Credentials= true;



  const [UserName, setUserName] = useState('');
  // const [newItem, setNewItem] = useState('');
  const [posts, setPosts]     = useState([]);


//   const [postTitle, setPostTitle] = useState('');
//   const [postBody, setPostBody] = useState('');

//    async function handleSubmit(e) {
//       e.preventDefault();
//       console.log(postBody);
//       //const id = random.uuid();
//       const newPost = { id:crypto.randomUUID(), title: postTitle, body: postBody };

//       try{const data = await axios.post('http://localhost:4700/addpost',{newPost})
//       setPosts([]);
//      // const allPosts = [...posts, data.data];
//       setPosts(data.data);
//       setPostTitle('');
//       setPostBody('');
//  // console.log(data);
//   }
//       catch(err){console.log(err);}

//     }

  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4700/top10');
       // console.log(response.data);
        setPosts(response.data);
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

    fetchPosts();
  }, [])



  

  return (
   
        <Routes >
        
          <Route  path="/" element={<Layout UserName={UserName} setUserName={setUserName}/>}>
                <Route index element={<Home posts={posts} />} /> 
      
                <Route element={<RequireloginAuth/>}>
                  <Route path="login" element={<Login UserName={UserName} setUserName={setUserName} />}/>
                </Route>

                <Route path="signUp" element={<SignUp />}/>
                

                <Route element={<RequireAuth  />}>
                   {/* <Route path="addpost" element={<Addpost 
                   handleSubmit={handleSubmit}
                   postTitle={postTitle}
                   setPostTitle={setPostTitle}
                   postBody={postBody}
                   setPostBody={setPostBody}
                   />}
                   /> */}

                  <Route path='profile/:id' element={<Profile/>}/>
                </Route>
                    
                    
                    <Route path='search/:query' element={<SearchResults/>}/>
                
                    <Route path='actor/:query' element={<Actors/>}/>

                    <Route path='blog' element={<Addpost/>}/>

                 <Route path="/film/:id" element={<DisplayPost 
                     posts={posts}
                   />}/>
                   
                 <Route path="films" element={<Films/>} />
          </Route>
          
        </Routes> 
     
       
        
    
  );
}

export default App;
