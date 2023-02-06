const express = require('express')
const UserDao = require('../dao/user.dao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authtenticationMiddleware = require('../middleware/verifytoken')
const authorizationMiddleware = require('../middleware/auth')

const { Router } = express

module.exports = ()=>{
    const api = Router()

    api.get('/',  [authtenticationMiddleware, authorizationMiddleware(['admin'])], async (req,res)=>{
        try {
            console.log('testingMiddleware',req.user);
            let response = await UserDao.getAllUsers()
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
        
    })

    api.get('/:id', [authtenticationMiddleware, authorizationMiddleware(['admin'])], async(req,res)=>{
        const id = req.params.id
        try {
            let response = await UserDao.getUser(id)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
        
    })

    api.post('/', async (req,res)=>{
        const { userName,userCategory,password,email } = req.body
        try {

            // Validate user
            if(userName && userCategory && password && email){

            // Check if user already exist
                const oldUser = await UserDao.checkUser(email)

            // Validate user
                if(oldUser){
    
                    res.status(500).json({response:"false", payload:"User already exists"})
                }else{

                    // Encrypt user password
                


                const hashPassword = await bcrypt.hash(password,10)
                        
                console.log('hashPassword',hashPassword)

                   
                    
                // Creating the user
                let response = await UserDao.createUser(userName,userCategory,hashPassword,email)
                res.status(201).json({response:"ok", payload:response})
                }

            }else{
                res.status(500).json({response:"false", payload:"All inputs are required"})
            }
            
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
        
    })

    api.post('/login', async (req,res)=>{

        const {email, password} = req.body

        try {

            let user = await UserDao.checkUser(email)
            // console.log('user',user);
            if(user){

            let passwordCheck = await bcrypt.compare(password,user.password)
                console.log('passwordCheck',passwordCheck);

                    if(passwordCheck){

                        
                        // Create token
            
                        const token = jwt.sign(
                            {"userName":user.userName, email, "userCategory":user.userCategory},
                            process.env.JWT_SECRET,
                            {expiresIn:"1h"}
                        )
            
                        res.status(200).json({response:"ok", payload:{user,token}})
                    }else{

                            return res.status(400).json({response:"false", payload:"invalid password"})
                    }

            }else{

                return res.status(400).json({response:"false", payload:"invalid email"})
            }  
        } catch (error) {

            res.status(500).json({response:"false", payload:error.message})
        }
    })


    api.put('/:id', [authtenticationMiddleware, authorizationMiddleware(['customer'])], async (req,res)=>{
        const id = req.params.id
        const {userName,password} = req.body
        try {
            let response = await UserDao.updateUser(id,userName,password)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
    })

    api.delete('/:id', [authtenticationMiddleware, authorizationMiddleware(['admin'])], async (req,res)=>{
        const id = req.params.id
        try {
            let response = await UserDao.deleteUser(id)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
    })

    return api;
}