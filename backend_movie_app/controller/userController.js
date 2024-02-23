const usersDB = require("../models/usersDB.js");
const moviesDB = require("../models/moviesDB.js");
const ratingDB = require("../models/ratingsDB.js");

module.exports.controlWatched = async(req, res)=>{
    const Username = req.session.Username;
    const UserID = req.session.UserID; 
    const {watched,movie}=req.body;
    const watchedmovie = {movie,watched,rating:0}
     req.session.movie = movie;    
    // if( Username ){                  
    //          if(watched){
    //                  console.log('inside watched');
         
    //                 try{

    //                 await ratingDB.updateOne({UserID},{$push:{watchedmovie}});

    //                     res.redirect('/getwatched');        
    //                 }
    //                 catch(e){console.log(e)}        
    //         }

    //          else{ 
    //           //  console.log(watched)
    //             try{
    //           await ratingDB.updateOne({ UserID}, { $pull: { watchedmovie:  {movie}  } })
    //           res.redirect('/getwatched');
    //         }
    //         catch(e){console.log(e)}
    //          //await ratingDB.findOneAndDelete({UserID,watchedmovie})
            
    //         }

    //     }

    if( Username && watched ){                  
       
                console.log('inside watched');
    
               try{

             const add = await ratingDB.updateOne({UserID},{$push:{watchedmovie}});
            
             console.log('added',add);
                  // res.redirect('/addrating');        
               }
               catch(e){console.log(e)}        
       
            }

       else if(Username && !watched){ 
         //  console.log(watched)
           try{
         await ratingDB.updateOne({ UserID}, { $pull: { watchedmovie:  {movie}  } })
         //res.redirect('/getwatched');
       }
       catch(e){console.log(e)}
        //await ratingDB.findOneAndDelete({UserID,watchedmovie})
       
       }

       res.redirect('/getwatched');
   

}


module.exports.addRating = async(req, res)=>{
  const Username = req.session.Username;
  const UserID = req.session.UserID; 
  const {rating,movie}=req.body;
  // const watchedmovie = {movie,watched}
  //  req.session.movie = movie; 
  console.log(rating, movie,Username, 'ratingpostt')   

  if( Username ){                  
     
              console.log('inside');
  
             try{
              const find = await ratingDB.findOne(
              {UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } } })
              console.log('found',find);

              if(find.watchedmovie.length >=1){
                  // console.log('find',find)
                   const add = await ratingDB.updateOne({UserID, watchedmovie: { $elemMatch: { movie:  movie  } }}, 
                    {$set : {"watchedmovie.$.rating" : rating} }
                     );

                  //  console.log(moviearr, 'hooray');
                   console.log('added rating');
              }
              else{
                // res.send();
              }
                // res.redirect('/getwatched');        
             }
             catch(e){console.log(e)}        
     
          }

    //  else if(Username && !watched){ 
    //    //  console.log(watched)
    //   //    try{
    //   //  await ratingDB.updateOne({ UserID}, { $pull: { watchedmovie:  {movie}  } })
    //    //res.redirect('/getwatched');
    //  }
    //  catch(e){console.log(e)}
      //await ratingDB.findOneAndDelete({UserID,watchedmovie})
     
    //  }

     res.redirect('/getwatched');
 

}


module.exports.getWatched=async(req,res)=>{

  if(req.session.Username){

        console.log('inside get') 
        // console.log('inside get') 
        const UserID = req.session.UserID;           

 
        let movie = req.query.movie;
        // console.log('movie through get',movie) 


        if(!movie){movie=req.session.movie
        // console.log('movie through post',req.session.movie);
        }
        //const watchedmovie = {movie,watched:true}

            try{
            // console.log('reached try') 
          //  const moviefromDB = await ratingDB.findOne({UserID, watchedmovie})
            
           const moviefromDB = await ratingDB.find( {UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } } } )
          const data = moviefromDB[0].watchedmovie;
          //  console.log('moviefromDB.',data)
            
           if(data.length >= 1){
            const userrating = data[0].rating;
            console.log(userrating, 'get userrating')
            res.send({watched:true , userrating});
           }
           else{
             res.send({watched:false, userrating:0});
           // return
           }

             }
            catch(e){console.log(e)}
            }
}