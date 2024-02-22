//npm init
//npm i express dotenv hbs mongo mongoose nodemon body-parser express-session connect-mongodb-session



require("dotenv").config();

const path = require('path');
const express = require('express');
const app= express();
const PORT = process.env.PORT || 4700;
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
const bodyparser = require('body-parser');//use with axios 
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors( {
origin: 'http://localhost:3000', credentials: true,
withCredentials: true
}))


const mongoose = require('mongoose');
const { mongoConnect } = require('./database/database.js');



const session = require('express-session')
const MongoDBsession = require('connect-mongodb-session')(session);//use with session

const store = new MongoDBsession({
    uri: process.env.MONGODB_URL,
    collection: "mysessions"
});

app.use(cookieParser())

app.use(
    session({
        secret:'secret key for cookie',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie:{secure:false}
    })
);




app.set('view engine','hbs');


app.use(express.urlencoded({ extended: true }));
//app.use(bodyparser.json()); 
 app.use(bodyparser.json({limit: "50mb"}));
 app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'photos')));





// const adminhomeRouter = require('./routes/adminhome.js');
// app.use('/adminhome', adminhomeRouter);



// const AuthRouter = require('./routes/authentication.js');
// app.use('/', AuthRouter);


const landingpageRouter = require('./routes/landingpage.js');
app.use('/', landingpageRouter);

const moviepageRouter= require('./routes/moviepage.js');
app.use('/movie',moviepageRouter);

const userRouter = require('./routes/user.js');
app.use('/', userRouter);


const dataDB = require("./models/ratingsDB.js");

// app.post('/addpost', async (req, res ) =>{

//    // console.log('this is the incoming post',req.body);


//     const title= req.body.newPost.title;
//     const body= req.body.newPost.body;
//    // console.log('this is the incoming  isnide',req.body.newPost.title);
    

//      let newdata = new dataDB ({title,body});
//      newdata.save()
//      .then(()=>{
        
        
//      console.log('question added success');
//         res.redirect('/posts');
//       })
//        .catch(err =>{console.log(err);});
    
    
//     });


const download = require('image-downloader');

    



//   async function downloadImage(url, filepath) {
//         return download.image({
//            url,
//            dest: filepath 
//         });
//     }


//     const url ='https://m.media-amazon.com/images/M/MV5BMWZlYjU0MzAtZGIyZi00MzZjLWE4ZjktMWE3ZDU1ZjM3ZTNkXkEyXkFqcGdeQXVyMzExODEzNDA@._V1_.jpg';
//  const path ='./utils'
// downloadImage(url,path);

// app.get('/posts',async(req, res)=>{

    // const URL = 'https://search.imdbot.workers.dev/?tt=tt15009428';
   


 


    // fetch(URL)
    // .then((res)=>{
    //     return res.json();
    // })
    // .then((moviefromapi)=>{
    //   //  console.log(moviefromapi);

    //                   let newmovie = new moviesDB ({moviefromapi});
    //                   newmovie.save()
    //                   .then(()=>{
                        
                        
    //                   console.log('movie image link',moviefromapi.short.image);


    //                             const options = {
    //                          url: `${moviefromapi.short.image}`,
    //                          dest: path.resolve('public/posters'),            
    //                             };
      
    //                         download.image(options)
    //                           .then(({ filename }) => {
    //                             console.log('Saved to', filename); 
    //                           })
    //                           .catch((err) => console.error(err));
                        
    //                     })
    //                     .catch(err =>{console.log(err);});
        
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })


   
    // const options = {
    //     url: 'https://m.media-amazon.com/images/M/MV5BZjQwYjU3OTYtMWVhMi00N2Y2LWEzMDgtMzViN2U4NWI1NmI3XkEyXkFqcGdeQXVyODk2NDQ3MTA@._V1_.jpg',
    //     dest: path.resolve('public/posters'),               // will be saved to /path/to/dest/image.jpg
    //   };
      
    //   download.image(options)
    //     .then(({ filename }) => {
    //       console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    //     })
    //     .catch((err) => console.error(err));


     

   //console.log('reached here',moviefromapi);
  // const moviename = moviefromapi.short.name;
 //= await moviesDB.find({moviename});
//  let movie= await moviesDB.find({}, {'moviefromapi.short.name':1})

//  let name = movie.map(e=>({ id: e._id.toString(), name: e.moviefromapi.short.name, img:`http://localhost:4700/utils/${e._id.toString()}.jpg`}));

 
// //  ,e.moviefromapi.short.name
//  console.log(name);


 
// res.send(name);


//})    
    
// const usersDB = require("./models/usersDB.js");

// app.post('/signUp',async(req, res)=>{

//     const {Username,Password}=req.body; 
//     console.log(req.body);

//     let newUser = new usersDB ({Username,Password});
//     newUser.save()
//      .then(()=>{
        
        
//      console.log('user addes success');
//         // res.redirect('/');
//       })
//        .catch(err =>{console.log(err);});
    

// });

// app.post('/login',async(req, res)=>{

//     const {Username,Password}=req.body; 
//     // console.log(req.body);

//     let user = await usersDB.findOne({Username,Password});
//    console.log(user);

    
//     if(user){res.send(true)}
//     else if(!user){res.send(false)}

// });


// app.get('/getimage',async(req, res)=>{

// //res.send(MV5BNDYzYzc0MDYtMGM2MC00YzNjLWJhMjYtYzJhMWViMjgxZTcwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg);

// });




    
// app.listen(PORT, () => {
//     console.log(`http://localhost:` + PORT);
// })




//////USE BELOW CODE WITH MONGOOSE  
//////

mongoose.connect(process.env.MONGODB_URL ,{
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
   // useCreateIndex: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        })
    })
    .catch(err => {console.error(err);});

