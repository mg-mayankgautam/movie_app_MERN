const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const dataSchema = new Schema({
    title: {type:String},
    body: {type:String}

});

module.exports =mongoose.model('Data',dataSchema);

