const moviesDB = require("../models/moviesDB.js");
const path = require('path');
const download = require('image-downloader');



module.exports.getMovies = async(req, res)=>{

    
////////////////////////////////////////////////////////////////////////////////////////////////////
    // const URL = 'https://search.imdbot.workers.dev/?tt=tt17351924';
   



    // fetch(URL)
    // .then((res)=>{
    //     return res.json();
    // })
    // .then((moviefromapi)=>{
    //   //  console.log(moviefromapi);

    //                   let newmovie = new moviesDB ({moviefromapi});
    //                   newmovie.save()
    //                   .then((saved)=>{
                        
    //                    const postername = saved._id.toString() 
    //                    const imageurl = saved.moviefromapi.short.image;
    //                   console.log(saved,'movie image link');

                        


    //                             const options = {
    //                          url: `${imageurl}`,
    //                          dest: path.resolve(`./public/posters/${postername}.jpg`),            
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

    

///////////////////////////////////////////////////////////////////////









    let movie= await moviesDB.find({}, {'moviefromapi.short.name':1})

    let name = movie.map(e=>({ id: e._id.toString(), name: e.moviefromapi.short.name, img:`http://localhost:4700/posters/${e._id.toString()}.jpg`}));

    //  ,e.moviefromapi.short.name
    // console.log(name);

   
    res.send(name);


}

module.exports.getMovie=async(req,res)=>{

    const {id} = req.query
console.log('req.session.Username',req.session.Username)
//console.log('req)

try{

    if(!req.session.Username){
        let movie= await moviesDB.find({_id:id},{'moviefromapi':1})
   // console.log(movie[0].moviefromapi.storyLine.summaries.edges[0].node.plotText.plaidHtml)
        // console.log(movie[0].moviefromapi.top.releaseDate)
        // //console.log(movie[0].moviefromapi.runtime)
        // console.log(movie[0].moviefromapi.top.titleText)
        // console.log(movie[0].moviefromapi.top.genres)
        // console.log(movie[0].moviefromapi.top.plot.plotText)
        // console.log(movie[0].moviefromapi.short.actor)
        // console.log(movie[0].moviefromapi.short.director)

        const release_date=movie[0].moviefromapi.top.releaseDate;
        const name = movie[0].moviefromapi.top.titleText;
        const runtime = movie[0].moviefromapi.top.runtime.displayableProperty.value.plainText;
        const plot = movie[0].moviefromapi.top.plot.plotText;
        const actors = movie[0].moviefromapi.short.actor;
        const director= movie[0].moviefromapi.short.director;
        const genres = movie[0].moviefromapi.top.genres;
        const url = `http://localhost:4700/posters/${id}.jpg`
    


    //let short = movie.moviefromapi.short
    res.send({release_date,name,runtime,plot, actors, director,genres, url,auth:false})}


        else if(req.session.Username){

            let movie= await moviesDB.find({_id:id},{'moviefromapi':1})
            // console.log(movie[0].moviefromapi.storyLine.summaries.edges[0].node.plotText.plaidHtml)
                 // console.log(movie[0].moviefromapi.top.releaseDate)
                 // //console.log(movie[0].moviefromapi.runtime)
                 // console.log(movie[0].moviefromapi.top.titleText)
                 // console.log(movie[0].moviefromapi.top.genres)
                 // console.log(movie[0].moviefromapi.top.plot.plotText)
                 // console.log(movie[0].moviefromapi.short.actor)
                 // console.log(movie[0].moviefromapi.short.director)
         
                 const release_date=movie[0].moviefromapi.top.releaseDate;
                 const name = movie[0].moviefromapi.top.titleText;
                 const runtime = movie[0].moviefromapi.top.runtime.displayableProperty.value.plainText;
                 const plot = movie[0].moviefromapi.top.plot.plotText;
                 const actors = movie[0].moviefromapi.short.actor;
                 const director= movie[0].moviefromapi.short.director;
                 const genres = movie[0].moviefromapi.top.genres;
                 const url = `http://localhost:4700/posters/${id}.jpg`
             
         
         
             //let short = movie.moviefromapi.short
             res.send({release_date,name,runtime,plot, actors, director,genres, url,auth:req.session.Username})}


        }






        catch(e){console.log(e)}
    
       



}



module.exports.postMovie = async(req,res) =>{
    const {moviefromapi} = req.body;
    
console.log(moviefromapi, 'hereeeeeee')

//   async function downloadImage(url, filepath) {
//         return download.image({
//            url,
//            dest: filepath 
//         });
//     }

    const movie = await moviesDB.findOne({moviefromapi});
    console.log(movie);
 
     

    if(!movie){
        console.log('inside')

                      let newmovie = new moviesDB ({moviefromapi});
                      newmovie.save()
                      .then((saved)=>{
                        
                            const postername = saved._id.toString() 
                            const imageurl = saved.moviefromapi.short.image;
                            console.log(saved,'movie image link');
                    
                                            
                    
                    
                            const options = {
                            url: `${imageurl}`,
                            dest: path.resolve(`./public/posters/${postername}.jpg`),  
                            
                            
                             };
                             res.send(postername)
                          
                            download.image(options)

                           

                          .then(({ filename }) => {
                            console.log('Saved to', filename); 
                                                  })
                         .catch((err) => console.error(err));
                                            
                                            })
                 .catch(err =>{console.log(err);});
        
        }
                    
    else{
        console.log('movie already in DB')
    res.send(movie._id.toString());
    }   
    
                   
}