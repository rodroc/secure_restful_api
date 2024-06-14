const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    Promise = require("bluebird"),
    _ = require("lodash"),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    validator = require('validator')

const knex = require("./DB"),
    User = require('./models/user')
    
const conn = knex.dev    
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

const getFullList = async () => {
    // return knex.dev("tasks")
}

app.post('/register',async(req,res)=>{
    try{
        // const tasks = await conn('tasks') // console.log({tasks})
        // const users = await conn('users') // console.log({users})
        const { email,password } = req.body
        console.log('saving...',req.body)
        // TODO: add validation
        if( !validator.isEmail(email) ) return res.status(400).send({error:"Not a valid email"})
        if( !password ) return res.status(400).send({error:"Password is required"})
        if( !(password.length>7 && password.length<17) ) return res.status(400).send({error:"Password length should be between 8 to 16 characters."})
        // TODO: you can add more requirements
        const user = new User(email,password)
        await conn("users").insert(user)
        res.status(200).json({})
    }catch(error){throw error}
})

app.post('/login',async(req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){throw error}
})

// create a new task
app.post('/task',async(req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){throw error}
})

app.get('/tasks',async (req,res)=>{
    try{
        // const tasks = await knex.dev('tasks') // works!
        const tasks = await conn('tasks')
        console.log({tasks})
        // console.log({tasks})
        res.status(200).json({})       
    }catch(error){throw error}
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
    }catch(error){throw error}
})

app.put('/tasks/:id',async (req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){throw error}
})

app.delete('/tasks/:id',async (req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){throw error}
})

server.listen(3001, () => {
    console.log('listening on *:3001');
});
