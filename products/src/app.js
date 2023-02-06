const mongoConn = require('./connection/mongo.connection')()
const express = require('express')
const app = express()

const cors = require('cors')
const routes = require('./routes/product.routes')()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/v1/product', routes)

app.listen(3001, ()=>{
    console.log("connected to the product microservice on port 3001");
})

