const express = require('express')
const path = require('path')
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.static(path.join(__dirname,"views")))


// let test = path.join(__dirname,"views","index.html")
// console.log(test);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,"views","index.html"))
})

app.listen(3005, ()=>{
    console.log("ure logged in to the www server on port 3005");
})