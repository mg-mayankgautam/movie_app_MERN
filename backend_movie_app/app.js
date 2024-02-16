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


app.use(cors())


const mongoose = require('mongoose');
const { mongoConnect } = require('./database/database.js');



const session = require('express-session')
const MongoDBsession = require('connect-mongodb-session')(session);//use with session

const store = new MongoDBsession({
    uri: process.env.MONGODB_URL,
    collection: "mysessions"
});

app.use(
    session({
        secret:'secret key for cookie',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);




app.set('view engine','hbs');


app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));










// const landingpageRouter = require('./routes/landingpage.js');
// app.use('/addpost', landingpageRouter);


// const adminpageRouter = require('./routes/adminpage.js');
// app.use('/admin', adminpageRouter);



// const adminhomeRouter = require('./routes/adminhome.js');
// app.use('/adminhome', adminhomeRouter);


const dataDB = require("./models/dataDB.js");
const moviesDB = require("./models/moviesDB.js");

app.post('/addpost', async (req, res ) =>{

   // console.log('this is the incoming post',req.body);


    const title= req.body.newPost.title;
    const body= req.body.newPost.body;
   // console.log('this is the incoming  isnide',req.body.newPost.title);
    

     let newdata = new dataDB ({title,body});
     newdata.save()
     .then(()=>{
        
        
     console.log('question addes success');
        res.redirect('/posts');
      })
       .catch(err =>{console.log(err);});
    
    
    });

app.get('/posts',async(req, res)=>{

    // const URL = 'https://search.imdbot.workers.dev/?tt=tt15009428';
   


    // try{
    // const res = await fetch(URL);
    // const moviefromapi= res.json();}
    // catch(e){console.log(e)}


    // fetch(URL)
    // .then((res)=>{
    //     return res.json();
    // })
    // .then((moviefromapi)=>{
    //   //  console.log(moviefromapi);

    //                   let newmovie = new moviesDB ({moviefromapi});
    //                   newmovie.save()
    //                   .then(()=>{
                        
                        
    //                   console.log('movie added success');
                        
    //                     })
    //                     .catch(err =>{console.log(err);});
        
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })






     

   //console.log('reached here',moviefromapi);
  // const moviename = moviefromapi.short.name;
 //= await moviesDB.find({moviename});
 let movie= await moviesDB.find({}, {'moviefromapi.short.name':1})

 let name = movie.map(e=>({ id: e._id.toString(), name: e.moviefromapi.short.name}));

//  ,e.moviefromapi.short.name
 console.log(name);


 
res.send(name);


})    
    
const usersDB = require("./models/usersDB.js");

app.post('/signUp',async(req, res)=>{

    const {Username,Password}=req.body; 
    console.log(req.body);

    let newUser = new usersDB ({Username,Password});
    newUser.save()
     .then(()=>{
        
        
     console.log('user addes success');
        // res.redirect('/');
      })
       .catch(err =>{console.log(err);});
    

});

app.post('/login',async(req, res)=>{

    const {Username,Password}=req.body; 
    // console.log(req.body);

    let user = await usersDB.findOne({Username,Password});
   console.log(user);

    
    if(user){res.send(true)}
    else if(!user){res.send(false)}

});




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



    