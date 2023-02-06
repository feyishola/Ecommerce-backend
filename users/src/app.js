const mongoConn = require('./connection/mongo.connection')()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/user.routes')()
// const authtenticationMiddleware = require('./middleware/verifytoken')s

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/api/v1/user', routes)

app.listen(3003,()=>{
    console.log("connected to the user's microservice on port 3003");
})
