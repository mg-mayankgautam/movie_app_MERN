const path = require('path');
const express = require('express');
const router = express.Router();

 const movieController = require('../controller/movieController');
// const authController = require('../controller/authController');


// router.post('/signUp',authController.signUp)
// router.post('/login',authController.logIn)
 router.get('/', movieController.getMovie);
    router.post('/addmovie', movieController.postMovie)





module.exports = router;
