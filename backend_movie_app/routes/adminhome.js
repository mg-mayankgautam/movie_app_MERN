const path = require('path');
const express = require('express');
const router = express.Router();


const adminHomeController = require('../controller/adminHomecontroller.js');



router.get('/',adminHomeController.loadAdminHome);
router.get('/logout',adminHomeController.logout);



module.exports = router;