const usersDB = require("../models/usersDB.js");
const moviesDB = require("../models/moviesDB.js");
const ratingDB = require("../models/ratingsDB.js");

module.exports.controlWatched = async(req, res)=>{


        if( req.session.Username){
            const UserID = req.session.UserID;           
            const Username = req.session.Username;
            const {watched,movie}=req.body;
            
            const watchedmovie = {movie,watched}
           
           // let data= await ratingDB.findOne({UserID,watchedmovie});
            //console.log(watched)
        
           
         
           
           
             if(watched){
                 //    console.log('here',req.body);
         
                    try{

                    await ratingDB.updateOne({UserID},{$push:{watchedmovie}});

                        res.redirect('/getwatched');
                    
                    
                    }
                    catch(e){console.log(e)}


          
            
             }



             else{ 
              //  console.log(watched)
                try{
              await ratingDB.updateOne({ UserID}, { $pull: { watchedmovie:  {movie}  } })
              res.redirect('/getwatched');
            }
            catch(e){console.log(e)}
             //await ratingDB.findOneAndDelete({UserID,watchedmovie})
            
            }




        }

    
}

module.exports.getWatched=async(req,res)=>{

// const sesInfo=req.session;
const UserID = req.session.UserID;           

// sesInfo?sesInfo.CurrentmovieID?console.log(sesInfo.CurrentmovieID):console.log('illay'):console.log('illay');

// const movie = sesInfo.CurrentmovieID;
const movie = req.query.movie;
const watchedmovie = {movie,watched:true}
try{

   const moviefromDB = await ratingDB.findOne({UserID, watchedmovie})

   console.log('moviefromDB',moviefromDB)
   if(moviefromDB){
    res.send({watched:true});
   }
   else{
    // res.send({watched:false});
    return
   }
   

}catch(e){console.log(e)}

}