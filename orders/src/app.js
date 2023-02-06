const mongoConnect = require('./connection/db.connection')
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/order.routes')()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/v1/order', routes)


app.listen(3000, ()=>{
    console.log("connected to the order microservice on port 3000");
})