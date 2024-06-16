const express = require('express'),
    validator = require('validator'),
    _ = require("lodash"),
    bcrypt = require('bcryptjs')

const { generateAuthToken }  = require('../lib/auth'),
    knex = require('../lib/DB'),
    User  = require('../models/user')
    
const router = express.Router()
const conn = knex.instance    

router.post('/register',async(req,res)=>{
    try{
        const { email,password } = req.body
        
        // Validation
        if( !validator.isEmail(email) ) {
            return res.status(400).send({error:"Not a valid email address."})
        }
        if( !(password.length>7 && password.length<17) ) {
            return res.status(400).send({error:"Password length should be between 8 to 16 characters."})
        }
        // You can add more requirements & validate
            
        const hashedPassword = await bcrypt.hash(password,8)
        const foundUser = await User.findOne({email})
        if( foundUser ){
            return res.status(400).send({error:"Email address already registered."})
        }
        const newUser = new User(email,hashedPassword)
        const userId = await newUser.save()
        const token = await generateAuthToken(userId)
        newUser.saveToken(token)
        return res.status(200).json({user:{id:userId,email},token})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const { email , password } = req.body
        // Validation
        if( !validator.isEmail(email) ) return res.status(400).send({error:"Not a valid email address."})
        if( !password ) {
            return res.status(400).send({error:"Password is required."})
        }

        const user = await conn.select(['id','email','password']).from('users').where({email}).first() 
        if( !user ) {
            return res.status(400).send({error:"Could not find the email address. Please register."})
        }
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password,hashedPassword)

        if( !isMatch ){
            return res.status(400).send({error:"Unable to login."})
        }
        const token = await generateAuthToken(user.id)
        const foundUser = new User(email,hashedPassword,user.id)
        await foundUser.saveToken(token)
        return res.status(200).json({user:{id:user.id,email},token})
    }catch(error){
        console.log({error})
        return res.status(400).send({error:"Application error."})
    }
})

// for testing purposes
router.post('/updatepassword',async(req,res)=>{
    try{
        const { email,password } = req.body
        
        // Validation
        if( !validator.isEmail(email) ) {
            return res.status(400).send({error:"Not a valid email address."})
        }
        if( !(password.length>7 && password.length<17) ) {
            return res.status(400).send({error:"Password length should be between 8 to 16 characters."})
        }
            
        const hashedPassword = await bcrypt.hash(password,8)
        
        // Search email from database
        const newUser = new User(email,hashedPassword)
        const foundUser = await newUser.findOne({email})
        if( !foundUser ){
            return res.status(400).send({error:"Please register."})
        }
        await conn("users").update({password:hashedPassword}).where({email})
        res.status(200).json({done:true})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

module.exports = router