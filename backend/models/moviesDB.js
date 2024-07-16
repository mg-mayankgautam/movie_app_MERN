const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const dataSchema = new Schema({
    moviefromapi: {type:Object},
    totalMovieRatings:{type:Object},
    totalWatched:{type:Number},
    addedDate:{type:Object},
});

module.exports =mongoose.model('movies',dataSchema);

