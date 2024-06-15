const express = require("express"),
    http = require("http"),
    cors = require("cors")

const userRouter = require('./routes/user'),
    taskRouter = require('./routes/task')
    
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/tasks',taskRouter)
// app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.status(404).send('cant find the page')
})

app.use((err,req,res,next)=>{
    res.status(500).send('error!')
})

const server = http.createServer(app)

server.listen(process.env.NODE_PORT, () => {
    console.log(`listening on *:${process.env.NODE_PORT}`);
});
