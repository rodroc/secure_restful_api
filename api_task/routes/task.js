const express = require('express')

const constants = require('../lib/constants'),
    { auth } = require('../lib/auth'),
    knex = require('../lib/DB'),
    User = require('../models/user'),
    Task = require('../models/task')

const router = express.Router()
const conn = knex.instance    

// create a new task
router.post('/', auth, async(req,res)=>{
    try{
        const { title } = req.body
        const newTask = new Task(req.userId)
        newTask.title = title
        await newTask.save()
        res.status(200).json({})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

router.get('/', auth, async (req,res)=>{
    try{
        console.log('userId',req.userId)
        const task = new Task(req.userId)
        const list = await task.select()
        console.log({list})
        res.status(200).json({})       
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

router.get('/:id',async (req,res)=>{
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

router.put('/:id',async (req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        res.status(200).json({})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

module.exports = router