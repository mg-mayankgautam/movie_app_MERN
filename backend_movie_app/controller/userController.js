const usersDB = require("../models/usersDB.js");
const moviesDB = require("../models/moviesDB.js");
const ratingDB = require("../models/ratingsDB.js");

module.exports.controlWatched = async(req, res)=>{
    const Username = req.session.Username;
    const UserID = req.session.UserID; 
    const {watched,movie,moviename, releasedate,
    movieposter, director} = req.body;
    // console.log(movie);
    const watchedmovie = {movie,watched,rating:0, moviename, releasedate, movieposter, director}
    req.session.movie = movie;    
    // console.log(movie);
    // console.log(req.body)
    

    if( Username && watched ){                  
              //  console.log('inside watched');
    
              //  try{

            await ratingDB.findOneAndUpdate({UserID},{$push:{watchedmovie}}, { returnDocument: "after" })
            .then((saved)=>{
              console.log('added');
              // const confirm = saved.watchedmovie.some(({movie})=> movie === movie);
              const updated = saved.watchedmovie.some(m=> m.movie === movie);
              console.log(updated, 'wuuhuu')
              res.send({watched:updated});
            })
                  // res.redirect('/addrating');        
              //  }
            .catch((e)=> {console.log(e)})      
       
    }

    else if(Username && !watched){ 
          // console.log(watched)
          //  try{
            await ratingDB.findOne({UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } } })
            .then(async(find)=>{

              if(find.watchedmovie.length >=1){
                const prevUserRating = find.watchedmovie[0].rating;
                console.log(prevUserRating,'control watched');

                if(prevUserRating!=0){
                  
                  const findinMovieDB = await moviesDB.findOne({_id:movie},{totalMovieRatings:1})
                  .then(async(findinMovieDB) => {
                    const prevTotal = findinMovieDB.totalMovieRatings.totalStars;
                    console.log(prevTotal, 'prev total Rating');
                    const newTotal = (Number(prevTotal) - Number(prevUserRating))
                    console.log(newTotal, 'new total Rating');
                    const prevtotalRatedBy = findinMovieDB.totalMovieRatings.totalRatedBy;
                    const totalRatedBy = (Number(prevtotalRatedBy) - Number(1));

                    await moviesDB.findOneAndUpdate({_id:movie}, {$set : {'totalMovieRatings.totalStars': newTotal, 'totalMovieRatings.totalRatedBy': totalRatedBy }})
                    .then((saved)=>{console.log(saved, 'buriburi');})
                    .catch((err)=>{console.log(err, 'buriburi');})
                  })
                  .catch((err)=>{console.log(err)});
                  // console.log(findinMovieDB.totalMovieRatings);
                  
                }
              }

            })
            .catch((e)=>{console.log(e)})

        await ratingDB.findOneAndUpdate({ UserID}, { $pull: { watchedmovie:  {movie}  } }, { returnDocument: "after" })
        .then((saved)=>{
          console.log(saved);
          const updated = saved.watchedmovie.some(m=> m.movie === movie);
          console.log(updated, 'wuuhuu')
          res.send({watched:updated});
        })
        .catch((err)=>{console.log(err, 'burbur');})
         //res.redirect('/getwatched');
      //  }
      //  catch{(e)=> {console.log(e)}}
        //await ratingDB.findOneAndDelete({UserID,watchedmovie})
       
       }
      //  res.redirect('/getwatched');
}


module.exports.addRating = async(req, res)=>{
  const Username = req.session.Username;
  const UserID = req.session.UserID; 
  const {rating,movie, moviename, releasedate,
    movieposter, director}=req.body;
  
  //  req.session.movie = movie;   

  if( Username ){                  
  
        try{
          const find = await ratingDB.findOne({UserID}, { watchedmovie: { $elemMatch: { movie:  movie  } } }) 
                 //   console.log('found',find);
                    
          if(find.watchedmovie.length >=1){
              // try{ 
                  // const userPrevRating = find.watchedmovie[0].rating;
      
                  await ratingDB.findOneAndUpdate({UserID, watchedmovie: { $elemMatch: { movie:  movie  } }}, {$set : {"watchedmovie.$.rating" : rating} }, {returnDocument: "after"})

                  .then((saved)=>{
                    // console.log(saved,'ho');
                    const updated = saved.watchedmovie.find((m)=> m.movie === movie)
                    // console.log(updated)
                    if(updated){
                      const userrating= updated.rating;
                      res.send({watched: true, userrating})
                    }
                  })
                  .catch((e)=>{console.log(e)})

                  
                  await moviesDB.findOne({_id: movie})
                  .then(async(findMovieDB)=>{
                    console.log(findMovieDB.totalMovieRatings,'found');
                    const prevTotal = findMovieDB.totalMovieRatings.totalStars;
                    console.log(prevTotal, 'prev total Rating');
                    const newTotal = (Number(prevTotal) - Number(userPrevRating)) + Number(rating);
                    console.log(newTotal, 'new total Rating');
                    // const addTotalrating = await moviesDB.updateOne({_id:movie}, {$set : {'totalMovieRatings.totalStars': newTotal}});
                    const prevtotalRatedBy = findMovieDB.totalMovieRatings.totalRatedBy;
                                
                          if(rating==0){
                              if(userPrevRating==0){  
                                    var totalRatedBy = Number(prevtotalRatedBy)
                                    console.log(totalRatedBy);
                                }
                              else{  
                                    var totalRatedBy = (Number(prevtotalRatedBy) - Number(1));
                                    console.log(totalRatedBy);
                                }
                          }
                          else{
                                if(userPrevRating==0){  
                                      var totalRatedBy = (Number(prevtotalRatedBy) + Number(1));
                                      console.log(totalRatedBy);
                                }
                                else{  
                                      var totalRatedBy = Number(prevtotalRatedBy)
                                      console.log(totalRatedBy);
                                }
                          } 
  
                        await moviesDB.updateOne({_id:movie}, {$set : {'totalMovieRatings.totalStars': newTotal, 'totalMovieRatings.totalRatedBy': totalRatedBy }})
                        .then((saved)=>{
                            console.log(saved,'updated AGR line 127')

                        })
                        .catch((e)=>{console.log(e)})
                  })
                  .catch((e)=>{console.log(e)})
            }

                            // else{

                            //   if(rating==0){  
                            //     var newtotalRatedBy = Number(0);
                            //     console.log(newtotalRatedBy);
                            //   }
                            //   else if(rating!=0){
                            //     var newtotalRatedBy = Number(1);
                            //     console.log(newtotalRatedBy);
                            //   }
                            //   // console.log(newtotalRatedBy,'var horha h bahar access');
                            //   const addTotalrating = await moviesDB.updateOne({_id:movie}, {$set : {'totalMovieRatings.totalStars': rating, 'totalMovieRatings.totalRatedBy': newtotalRatedBy}});
                            //   console.log(addTotalrating,'added AGR line 141')
                            // }
                            
                            //step-2) what to do when rating=0????
                          // }
                          // catch(e){console.log(e)}
                          
                        //  console.log(moviearr, 'hooray');
                      //   console.log('added rating');
          // }
          else{
                // try{
                  const watchedmovie = {movie,watched:true,rating:rating, moviename, releasedate, movieposter, director}

                  await ratingDB.findOneAndUpdate({UserID},{$push:{watchedmovie}}, {returnDocument: "after"})
                  .then((saved)=>{
                      // console.log(saved,'ho');
                      const updated = saved.watchedmovie.find((m)=> m.movie === movie);
                      // console.log(updated);
                      if(updated){
                        const userrating= updated.rating;
                        res.send({watched: true, userrating})
                      }       
                  })
                  .catch((e)=>{console.log(e)})

                  await moviesDB.findOne({_id: movie})
                  .then(async(findMovieDB)=>{
                        console.log(findMovieDB.totalMovieRatings,'found');
                        const prevTotal = findMovieDB.totalMovieRatings.totalStars;
                        console.log(prevTotal, 'prev total Rating');
                        const newTotal = Number(prevTotal) + Number(rating);
                        console.log(newTotal, 'new total Rating');
                        const prevtotalRatedBy = findMovieDB.totalMovieRatings.totalRatedBy;
                            if(rating==0){  
                              var totalRatedBy = Number(prevtotalRatedBy);
                              console.log(totalRatedBy);
                            }
                            else{ 
                              var totalRatedBy = (Number(prevtotalRatedBy) + Number(1));
                              console.log(totalRatedBy);
                            }
                                
                        await moviesDB.updateOne({_id:movie}, {$set : {'totalMovieRatings.totalStars': newTotal, 'totalMovieRatings.totalRatedBy': totalRatedBy }})
                        .then((saved)=>{
                          console.log(saved,'updated AGR line 195')
                        })
                        .catch((e)=>{console.log(e)});
                  })
                .catch((e)=>{console.log(e)})
                      // res.send();
          }      
        }
        catch(e){console.log(e)}       
     
  }
    // console.log('post done, redirecting to getwatched')
    //  res.redirect('/getwatched');
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
  
              // try{

            await ratingDB.findOneAndUpdate({UserID},{$push:{WatchList}}, { returnDocument: "after" })
            .then((saved)=>{
              console.log('added');
              // const confirm = saved.watchedmovie.some(({movie})=> movie === movie);
              const updated = saved.WatchList.some(m=> m.movie === movie);
              console.log(updated, 'wuuhuu')
              res.send({watchlist:updated});
            })
            // console.log('added',add);
      
            //  }
            .catch((e)=>{console.log(e)})        
     
          }

      else if(Username && !watchlist){ 
        //  console.log(watched)
        //  try{
        await ratingDB.findOneAndUpdate({ UserID}, { $pull: { WatchList:  {movie}  } }, { returnDocument: "after" })
        .then((saved)=>{
          console.log(saved);
          const updated = saved.WatchList.some(m=> m.movie === movie);
          console.log(updated, 'wuuhuu')
          res.send({watched:updated});
        })
        .catch((err)=>{console.log(err, 'burbur');})
      //  }
      // catch(e){console.log(e)}
 
     
     }

    // res.redirect('/getwatched');

}

module.exports.getWatched=async(req,res)=>{

  if(req.session.Username){

     //   console.log('inside get') 
        // console.log('inside get') 
        const UserID = req.session.UserID;           

 
        let movieID = req.query.movie;
        console.log('movie through get',movieID) 


        if(!movieID){movieID=req.session.movie
        console.log('movie through post',req.session.movie);
        }
      

        try{
            // console.log('reached try') 
          //  const moviefromDB = await ratingDB.findOne({UserID, watchedmovie})
            
           const moviefromDB = await ratingDB.findOne( {UserID}, { watchedmovie: { $elemMatch: { movie:  movieID  } },WatchList: { $elemMatch: { movie:  movieID  } } } );
          // const moviefromDB = await ratingDB.find( {UserID},{ watchedmovie: { $elemMatch: { movie:  movieID  } } } )
          //  WatchList: { $elemMatch: { movie:  movie  } }
          // console.log('moviefromDB',moviefromDB)
          
          //if(moviefromDB.length>=1){ const data = moviefromDB[0].watchedmovie;}
          const data = moviefromDB.watchedmovie;
          // console.log(data);
          const WL= moviefromDB.WatchList;
          console.log(data, WL, 'aagya?')
          if(data.length >= 1){
            // console.log(data[0].watchedmovie,'brrrrr')
            const userrating = data[0].rating;
            // console.log(userrating, 'get userrating')
            // res.send({watched:true, userrating});
            res.send({watched:true, userrating,WL});
          }
          else{ console.log('ehh')
            res.send({watched:false, userrating:0, WL});
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

