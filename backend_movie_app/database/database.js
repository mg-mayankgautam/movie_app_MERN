

// Yaha hum code likhenge to connect our 
// application with the database, so that we can perform the 
// operations on our collections 
const { MongoClient } = require('mongodb');
// const url = 'mongodb+srv://mayankgautam0811:wwZnjaDJ_tGG5Yw@cluster0.hv7zef4.mongodb.net/?';
const url = process.env.MONGODB_URL;
//const url = 'mongodb+srv://mansha02:mnm1234@cluster0.5ta8qjf.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);
const dbName = 'CODshit';
let _db;

const mongoConnect = ()=>{
    return client.connect()
            .then((client)=>{
                console.log("Connecting to mongodb");
                // console.log(client);
                _db = client.db(dbName);
            })
            .catch(err=>{
                console.log(err)
            });
}

const getDB = ()=>{
    if(_db) return _db;
    return null;
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;




// const URL = 'mongodb+srv://mansha02:mnm1234@cluster0.urykn5k.mongodb.net/userdb?retryWrites=true&w=majority';

// import mongoose from "mongoose" ;

// const promise = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });


// promise.then(data=>{
//     console.log('DB connecteddd');
// }) .catch(err=>{
//     console.log('Errorrr During Dbconnection ', err);

// })
// export default mongoose;