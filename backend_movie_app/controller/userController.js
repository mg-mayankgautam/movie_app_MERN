const usersDB = require("../models/usersDB.js");
const moviesDB = require("../models/moviesDB.js");
const ratingDB = require("../models/ratingsDB.js");

module.exports.controlWatched = async(req, res)=>{
    const Username = req.session.Username;
    const UserID = req.session.UserID; 
    const {watched,movie,moviename, releasedate,
    movieposter, director} = req.body;
    const watchedmovie = {movie,watched,rating:0, moviename, releasedate, movieposter, director}
     req.session.movie = movie;    

    // console.log(req.body)
    

    if( Username && watched ){                  
       
              //  console.log('inside watched');
    
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
  const {rating,movie, moviename, releasedate,
    movieposter, director}=req.body;
  
  //  req.session.movie = movie; 
 // console.log(rating, movie,Username, 'ratingpostt')   

  if( Username ){                  
     
             // console.log('inside');
  
             try{
                    const find = await ratingDB.findOne(
                          {UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } } })
                 //   console.log('found',find);
                    
                      if(find.watchedmovie.length >=1){
                        // console.log('find',find)
                          try{const add = await ratingDB.updateOne({UserID, watchedmovie: { $elemMatch: { movie:  movie  } }}, 
                            {$set : {"watchedmovie.$.rating" : rating} });}
                            
                          catch(e){console.log(e)}
                          
                        
                        //  console.log(moviearr, 'hooray');
                      //   console.log('added rating');
                      }
                      else{
                        try{
                          const watchedmovie = {movie,watched:true,rating:rating, moviename, releasedate, movieposter, director}
                          const add = await ratingDB.updateOne({UserID},{$push:{watchedmovie}});
                          
                          
                        }catch(e){console.log(e)}
                      // res.send();
                      }
                      // res.redirect('/getwatched');        
             }
             catch(e){console.log(e)}        
     
          }

  

     res.redirect('/getwatched');
 

}

module.exports.addWatchlist=async(req,res)=>{
  console.log('reached here',req.body)

   const Username = req.session.Username;
   const UserID = req.session.UserID; 
   const {watchlist,movie,moviename, releasedate, movieposter, director} = req.body;
  

   const WatchList = {movie, moviename, releasedate, movieposter, director}
    req.session.movie = movie;    

  // // console.log(req.body)
  

   if( Username && watchlist ){                  
     
  //           //  console.log('inside watched');
  
              try{

            const add = await ratingDB.updateOne({UserID},{$push:{WatchList}});
          
            console.log('added',add);
      
             }
              catch(e){console.log(e)}        
     
          }

      else if(Username && !watchlist){ 
        //  console.log(watched)
         try{
       await ratingDB.updateOne({ UserID}, { $pull: { WatchList:  {movie}  } })
  
       }
      catch(e){console.log(e)}
 
     
     }

    // res.redirect('/getwatched');
  


}

module.exports.getWatched=async(req,res)=>{

  if(req.session.Username){

     //   console.log('inside get') 
        // console.log('inside get') 
        const UserID = req.session.UserID;           

 
        let movie = req.query.movie;
        // console.log('movie through get',movie) 


        if(!movie){movie=req.session.movie
        // console.log('movie through post',req.session.movie);
        }
      

            try{
            // console.log('reached try') 
          //  const moviefromDB = await ratingDB.findOne({UserID, watchedmovie})
            
           const moviefromDB = await ratingDB.find( {UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } },WatchList: { $elemMatch: { movie:  movie  } } } )
           console.log('moviefromDB.',moviefromDB)
          
          //if(moviefromDB.length>=1){ const data = moviefromDB[0].watchedmovie;}
          const data = moviefromDB[0].watchedmovie;
          const WL= moviefromDB[0].WatchList
           if(data.length >= 1){
            const userrating = data[0].rating;
         //   console.log(userrating, 'get userrating')
            res.send({watched:true, userrating,WL});
           }
           else{
             res.send({watched:false, userrating:0,WL});
           // return
           }

             }
            catch(e){console.log(e)}
            }
}




module.exports.getUserData =async(req,res)=>{
 
 //console.log(req.query.username, 'get username') 
 //const userID=req.session.UserID
 const Username = req.query.username;

try{
  const data = await ratingDB.findOne({Username})
  // console.log(data.watchedmovie,'found user');
  const movieswatched = data.watchedmovie
  res.send(movieswatched);
}
catch(e){console.log(e)}

}

