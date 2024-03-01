const path = require('path');
const express = require('express');
const router = express.Router();

const movieController = require('../controller/movieController');
const authController = require('../controller/authController');


router.post('/signUp',authController.signUp)
router.post('/login',authController.logIn)
router.post('/logout',authController.logout)
router.get('/isauth',authController.isauth)
router.get('/films', movieController.getMovies);
router.get('/top10', movieController.getTop10);
router.get('/boxoffice', movieController.getBoxOffice);



module.exports = router;
