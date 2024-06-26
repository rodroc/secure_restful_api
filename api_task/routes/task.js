const express = require('express'),
    { body, validationResult } = require('express-validator')

const { auth } = require('../lib/auth'),
    Task = require('../models/task')

const router = express.Router()

// `POST /tasks`: Create a new task.
router.post('/', auth, [
        body('title').isLength({ min: 1 }),
        body('description').custom(async value => {
            //   throw new Error(`Description is ${value}`);
        }),
        body('due_date').custom(async value => {
            // TODO: validate date format
        }),
        body('completed').custom(async value => {
        }),
    ], async(req,res)=>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { title, description, due_date, completed } = req.body
        let newTask = new Task(req.userId)
        newTask.title = title
        newTask.description = description
        newTask.due_date = due_date
        newTask.completed = completed?1:0
        
        await newTask.save()
        res.status(200).json({...newTask})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

// `GET /tasks`: Retrieve all tasks for the authenticated user.
router.get('/', auth, async (req,res)=>{
    try{
        const task = new Task(req.userId)
        const { completed } = req.query
        let list = []
        if( completed ) list = await task.select({completed})
        else list = await task.select()
        res.status(200).json({list})       
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

// `GET /tasks/:id`: Retrieve a specific task by ID.
router.get('/:id', auth, async (req,res)=>{
    try{
        const { id } = req.params
        console.log({userId:req.userId,id})
        const task = new Task(req.userId)
        const item = await task.get({id})
        console.log({item})
        res.status(200).json({...item})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

// `PUT /tasks/:id`: Update a specific task by ID.
router.put('/:id', auth, [
    body('title').isLength({ min: 1 })
], async (req,res)=>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { id } = req.params
        const { title, description, due_date, completed } = req.body
        // console.log({userId:req.userId,id})
        const task = new Task(req.userId)
        await task.get({id})
        task.title = title
        task.description = description ?? ''
        task.due_date = due_date ?? ''
        task.completed = completed ?? 0
        await task.update()
        res.status(200).json({...task})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

// `DELETE /tasks/:id`: Delete a specific task by ID.
router.delete('/:id', auth, async (req,res)=>{
    try{
        const { id } = req.params
        const task = new Task(req.userId)
        await task.delete( id )
        res.status(200).json({id,message:`Deleted id ${id}.`})
    }catch(error){
        console.error(error)
        res.status(400).send({error:"Application error."})
    }
})

module.exports = router