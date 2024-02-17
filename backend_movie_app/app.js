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




// const adminhomeRouter = require('./routes/adminhome.js');
// app.use('/adminhome', adminhomeRouter);



// const AuthRouter = require('./routes/authentication.js');
// app.use('/', AuthRouter);


const landingpageRouter = require('./routes/landingpage.js');
app.use('/', landingpageRouter);






const dataDB = require("./models/dataDB.js");

app.post('/addpost', async (req, res ) =>{

   // console.log('this is the incoming post',req.body);


    const title= req.body.newPost.title;
    const body= req.body.newPost.body;
   // console.log('this is the incoming  isnide',req.body.newPost.title);
    

     let newdata = new dataDB ({title,body});
     newdata.save()
     .then(()=>{
        
        
     console.log('question added success');
        res.redirect('/posts');
      })
       .catch(err =>{console.log(err);});
    
    
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

