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
          console.log(watched)
           try{
            // const find = await ratingDB.findOne({UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } } }) 
            // if(find.watchedmovie.length >=1){
            //   const prevUserRating = find.watchedmovie[0].rating;
            //   const findinMovieDB = await moviesDB.findOne()
            // }

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
                        try{
                          // 
                         const userPrevRating = find.watchedmovie[0].rating;
                        // console.log('prev rating',userPrevRating);
                          //const totalrating = Number(rating)
                          // const movieRatings = {AGRrating: rating, ratedBy: UserID}
                          // const movieRatings = {AGRrating: rating}
      
                          const add = await ratingDB.updateOne({UserID, watchedmovie: { $elemMatch: { movie:  movie  } }}, 
                            {$set : {"watchedmovie.$.rating" : rating} });
                            
                            // if(rating==0){throw new Error("rating is zero!");}

                            const findMovieDB = await moviesDB.findOne({_id: movie});
                            // console.log(findMovieDB,'movie from movieDB');

                            if(findMovieDB.movieRatings){
                              console.log(findMovieDB.movieRatings,'found');
                              const prevTotal = findMovieDB.movieRatings.totalStars;
                              console.log(prevTotal, 'prev total Rating');
                              const newTotal = (Number(prevTotal) - Number(userPrevRating)) + Number(rating);
                              console.log(newTotal, 'new total Rating');
                              const addTotalrating = await moviesDB.updateOne({_id:movie}, {$set : {'movieRatings.totalStars': newTotal}});
                              // const prevRatedBy = findMovieDB.movieRatings.ratedBy;
                              // const newRatedBy = (Number(prevRatedBy) + Number(1));
                              // const addTotalrating = await moviesDB.updateOne({_id:movie}, {$set : {'movieRatings.totalStars': newTotal, 'movieRatings.ratedBy': newRatedBy}});
                              console.log(addTotalrating,'updated AGR')
                            }
                            else{
                              // console.log(findMovieDB.movieRatings,'found');
                              const movieRatings = {totalStars: rating};
                              console.log(movieRatings,'obj we created');
                              const addTotalrating = await moviesDB.updateOne({_id:movie}, {$set : {movieRatings: movieRatings }});
                              console.log(addTotalrating,'added AGR')
                            }
                            
                            //step-2) what to do when rating=0????
                          }
                          catch(e){console.log(e)}
                          
                        
                        //  console.log(moviearr, 'hooray');
                      //   console.log('added rating');
                      }
                      else{
                        try{
                          const watchedmovie = {movie,watched:true,rating:rating, moviename, releasedate, movieposter, director}
                          //s-1)add rating into aggregate of movie db,+rating,+1rated by.
                          // const movieRatings = {rating: rating, ratedBy: UserID} or const movieRatings = {UserID: rating}
                          // const addtomovieDB = await moviesDB.updateOne({_id:movie}, {$set : {movieRatings: movieRatings}});
                          // console.log(addtomovieDB,'hi');

                          const add = await ratingDB.updateOne({UserID},{$push:{watchedmovie}});
                          
                          const findMovieDB = await moviesDB.findOne({_id: movie});
                          console.log(findMovieDB,'movie from movieDB line 116');

                          // if(rating==0){
                          //   if(findMovieDB.movieRatings){
                          //     // console.log(findMovieDB.movieRatings,'found');
                          //     // const addViews = await moviesDB.updateOne({_id:movie}, {$set : {'movieRatings.TotalWatched':  }});
                          //     // console.log(addViews,'updated views');
                          //   }
                          //   else{
                          //     // console.log(findMovieDB.movieRatings,'found');
                          //     // const movieRatings = {AGRrating: rating};
                          //     // console.log(movieRatings,'obj we created');
                          //     // const addViews = await moviesDB.updateOne({_id:movie}, {$set : {movieRatings: movieRatings }});
                          //     // console.log(addViews,'updated views')
                          //   }
                          //   throw new Error("rating is zero!");
                          // }
                          if(findMovieDB.movieRatings){
                            console.log(findMovieDB.movieRatings,'found');
                            const prevAGR = findMovieDB.movieRatings.totalStars;
                            console.log(prevAGR, 'prev AGR Rating');
                            const newAGR = Number(prevAGR) + Number(rating);
                            console.log(newAGR, 'new AGR Rating');
                            const addAGRrating = await moviesDB.updateOne({_id:movie}, {$set : {'movieRatings.totalStars': newAGR }});
                            console.log(addAGRrating,'updated AGR')
                          }
                          else{
                            // console.log(findMovieDB.movieRatings,'found');
                            const movieRatings = {totalStars: rating};
                            console.log(movieRatings,'obj we created');
                            const addAGRrating = await moviesDB.updateOne({_id:movie}, {$set : {movieRatings: movieRatings }});
                            console.log(addAGRrating,'added AGR')
                          }
                          
                        }catch(e){console.log(e)}
                      // res.send();
                      }
                      // res.redirect('/getwatched');        
             }
             catch(e){console.log(e)}        
     
          }

  
          console.log('post done, redirecting to getwatched')
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
          
            // console.log('added',add);
      
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
          //  console.log('moviefromDB.',moviefromDB)
          
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
  // console.log(data.WatchList,'found user');
  const movieswatched = data.watchedmovie
  const watchlist = data.WatchList
  res.send({movieswatched, watchlist});
}
catch(e){console.log(e)}

}

