const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    Promise = require("bluebird"),
    _ = require("lodash"),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    validator = require('validator')

const knex = require("./lib/DB"),
    User = require('./models/user'),
    Task = require('./models/task')
    
const conn = knex.instance    
// conn.withSchema('tasks')
// const global.Promise = Promise;

const app = express()
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(cors())
const server = http.createServer(app)

const hashPassword = async() =>{
    const password = 'testing123'
    const hashedPassword = await bcrypt.hash('testing123',8)
    const isMatch = await bcrypt.compare(password,hashedPassword)
    console.log({password,hashedPassword,isMatch})
}

// hashPassword()

const myFunction = async() =>{
    const token = jwt.sign({ _id: 'abc123'},'signaturetext',{expiresIn:'10 seconds'})
    const data = jwt.verify(token,'signaturetext')
    console.log({token,data})

}

// myFunction()

const generateAuthToken = async identifier =>{
    const token = jwt.sign({ _id: identifier.toString() },'signaturetext',{expiresIn:'10 seconds'})
    return token
}

app.post('/register',async(req,res)=>{
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
            
        // Search email from database
        // let user = await conn('users').where({email}).first() 
        const hashedPassword = await bcrypt.hash(password,8)
        let newUser = new User(email,hashedPassword)
        const foundUser = await User.find({email})
        if( foundUser ){
            return res.status(400).send({error:"Email address already registered."})
        }
        await conn("users").insert(newUser)
        res.status(200).json({done:true})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

app.post('/login',async(req,res)=>{
    try{
        const { email , password } = req.body
        // Validation
        if( !validator.isEmail(email) ) return res.status(400).send({error:"Not a valid email address."})
        if( !password ) {
            return res.status(400).send({error:"Password is required."})
        }

        // Search email from database
        // withSchema('taskdb')
        let user = await conn.select(['id','email','password']).from('users').where({email}).first() 
        // console.log({user})
        if( !user ) {
            return res.status(400).send({error:"Could not find the email address. Please register."})
        }
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password,hashedPassword)

        if( !isMatch ){
            return res.status(400).send({error:"Unable to login."})
        }
         // generate token
        // const token = jwt.sign({ _id: user.id },'signaturetext',{expiresIn:'10 seconds'})
        const token = await generateAuthToken(user.id)
        // res.status(200).json({isMatch,password,hashedPassword,token})
        return res.status(200).json({user:{id:user.id,email},token})
    }catch(error){
        console.log({error})
        return res.status(400).send({error:"Application error."})
    }
})

// for testing purposes
app.post('/updatepassword',async(req,res)=>{
    try{
        const { email,password } = req.body
        
        // Validation
        if( !validator.isEmail(email) ) {
            return res.status(400).send({error:"Not a valid email address."})
        }
        if( !(password.length>7 && password.length<17) ) {
            return res.status(400).send({error:"Password length should be between 8 to 16 characters."})
        }
            
        // Search email from database
        const foundUser = await newUser.find({email})
        if( !foundUser ){
            return res.status(400).send({error:"Please register."})
        }
        const hashedPassword = await bcrypt.hash(password,8)
        await conn("users").update({password:hashedPassword}).where({email})
        res.status(200).json({done:true})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

// create a new task
app.post('/tasks',async(req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

app.get('/tasks',async (req,res)=>{
    try{
        // const tasks = await conn('tasks')
        // const taskDb = new Task() 
        // console.log({tasks})
        // console.log({tasks})
        res.status(200).json({})       
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

app.get('/tasks/:id',async (req,res)=>{
    try{
        let tasks = cache
        if( !tasks.length ) tasks = await dbTask.getAllTasks()
        let list = []
        const input = req.params
        const found = tasks.find(f=>f.id==input.id)
        if( found ){
            for await(const job of tasks){
                if( job.id==found.id ){
                    list.push({
                        id:found.id,
                        title:found.title,
                        is_active:0
                    })
                }else list.push(job)
            }
        }else list = tasks
        res.status(200).json(list)
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

app.put('/tasks/:id',async (req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

app.delete('/tasks/:id',async (req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

server.listen(3001, () => {
    console.log('listening on *:3001');
});
