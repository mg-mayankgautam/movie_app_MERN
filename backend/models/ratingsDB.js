const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const dataSchema = new Schema({
    UserID: {type:String},
    Username: {type:String},
    watchedmovie:{type:Array},
    WatchList:{type:Array},
    Lists:{type:Array}
    //movie: {type:String}

});

module.exports =mongoose.model('ratings',dataSchema);

