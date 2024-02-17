const moviesDB = require("../models/moviesDB.js");


module.exports.getMovies = async(req, res)=>{

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


}