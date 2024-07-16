const usersDB = require("../models/usersDB.js");
const ratingDB = require("../models/ratingsDB.js");


module.exports.checkUsername =async(req,res)=>{

    const Username = req.body.Username;
        console.log('usgernamer',Username);
    const user = await usersDB.findOne({Username},{Username:1});
    console.log(user);
    res.send({user});
}


module.exports.signUp = async (req,res)=>{

    const {Username,Password}=req.body; 
    console.log(req.body);

    let newUser = new usersDB ({Username,Password});
    newUser.save()
     .then((saved)=>{
                       const UserID = saved._id.toString();
                       const Username = saved.Username;
                       const watchedmovie=[];
                       const WatchList=[]; 
                       const Lists=[];
                     let rating = new ratingDB ({UserID,Username,watchedmovie,WatchList, Lists});
                     rating.save()
                      .then(()=>{


                     console.log('rating added success');
                    res.send(true);
                     })
                       .catch(err =>{console.log(err);});
        
                console.log('user addes success');
        // res.redirect('/');
      })
       .catch(err =>{console.log(err);});



}




module.exports.logIn = async (req,res)=>{

    const {Username,Password}=req.body; 
    // console.log(req.body);

    let user = await usersDB.findOne({Username,Password});
   
   //console.log(user);

    
    if(user){
        
        req.session.Username=Username;
        req.session.UserID=user._id.toString();
        res.json({Username:req.session.Username})}
    else if(!user){res.json(false)}
}


module.exports.logout = async (req,res)=>{

    try{
        req.session.destroy();
        console.log('logged out');
        res.send();

     //   res.send(false);
    }
    catch(err){console.log(err)}
}






module.exports.isauth=async (req,res)=>{
// console.log('isauth controller');
    if(!req.session.Username){
     

       
    


    
    res.send({auth:false})}


        else if(req.session.Username){

          
         
         
           
             res.send({auth:req.session.Username})}



}





// const userDB = require("../models/authenticationDB");
// //const rankingDB = require("../models/rankingDB");

// module.exports.getAdmin = async(req,res)=>{
//     //res.send({ "name": "GeeksforGeeks" });
//     res.render('admin',{
        
  
//      });
//    // res.send('ranking)
//        // console.log('inside get');
//     //res.send('some ranking data');
// }



// module.exports.signUp = async(req,res)=>{
    
// console.log(req.body)
// const {username,password} = req.body;
   
//     let user = await userDB.findOne({username});

//     if (user)
//       {return res.render('admin')}
// //    //console.log(req.session);
//     else{
//       let newuser = new userDB ({username,password});
//       newuser.save()
//      .then(()=>{
        
        
// //       //  console.log('user addes success');
//        res.render('admin');
//       })
//       .catch(err =>{console.log(err);});}

// }

// module.exports.logIn = async(req,res)=>{
    
//     console.log(req.body)
//     const {username,password} = req.body;

//     let user = await userDB.findOne({username});
//     if(!user){res.render('admin');}

//     let verified = await userDB.findOne({
//         username: username,
//         password: password,

// });

// if(!verified){res.render('admin');}

// else if(verified) {
//     req.session.authorised=true;
//     req.session.user=username;
//   //  console.log('iske aage kyu nii hora');
//    // res.render('adminhome')
//    res.redirect('/adminhome')
//     }

// };





