const mongoose = require('mongoose')

async function mongoConnect(){
    let mongo = mongoose.connection

    mongo.on('connected',()=>{
        console.log("connected to mongo db");
    })
    .on('error', (err)=>{
        console.log("error occured connecting to db",err);
    })
    .on('disconnected',()=>{
        setTimeout(async ()=>{

            await mongoose.connect('mongodb://mongodb:27017/ecommerce')
        },3000)
    })

    await mongoose.connect('mongodb://mongodb:27017/ecommerce')
}

module.exports = mongoConnect()