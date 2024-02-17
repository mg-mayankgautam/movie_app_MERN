const usersDB = require("../models/usersDB.js");


module.exports.signUp = async (req,res)=>{

    const {Username,Password}=req.body; 
    console.log(req.body);

    let newUser = new usersDB ({Username,Password});
    newUser.save()
     .then(()=>{
        
        
     console.log('user addes success');
        // res.redirect('/');
      })
       .catch(err =>{console.log(err);});
}

module.exports.logIn = async (req,res)=>{

    const {Username,Password}=req.body; 
    // console.log(req.body);

    let user = await usersDB.findOne({Username,Password});
   console.log(user);

    
    if(user){res.send(true)}
    else if(!user){res.send(false)}
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





