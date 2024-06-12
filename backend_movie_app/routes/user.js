const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
// const authController = require('../controller/authController');


router.post('/addwatched',userController.controlWatched)
// router.post('/login',authController.logIn)

router.get('/getwatched', userController.getWatched);
router.post('/addrating', userController.addRating)
router.post('/addwatchlist', userController.addWatchlist)
router.post('/addnewlist', userController.addNewList);
router.get('/getlists', userController.getLists);
router.get('/getuserdata',userController.getUserData);




module.exports = router;
