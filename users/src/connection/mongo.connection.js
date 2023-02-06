const mongoose = require('mongoose')

module.exports = async ()=>{
    let dbCon = mongoose.connection;

    dbCon
        .on('connected', ()=>{
            console.log("connected to mongo db");
        })
        .on('error', (err)=>{
            console.log('error connecting to db', err.message);
        })
        .on('disconnected', ()=>{
            setTimeout(async ()=>{
                await mongoose.connect('mongodb://mongodb:27017/ecommerce')
            },3000)
        })
        await mongoose.connect('mongodb://mongodb:27017/ecommerce') 
}