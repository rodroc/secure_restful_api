const { sentence } = require('txtgen/dist/cjs/txtgen.js')

const conn = require('../lib/DB').instance

test(`Task Model`,async()=>{
    const taskModel = require('../models/task')
    const id_user = 1 // mock id_user
    const task = new taskModel(id_user)
    let description = sentence()
    let title = description.substring(0,24)
    task.title = title
    task.description = description
    const id_task = await task.save()
    expect(id_task).toBeGreaterThan(0) 

    // find using knex connection
    let foundTask = await conn("tasks").where({id:id_task}).first()
    expect(foundTask.title).toBe(title)
    expect(foundTask.description).toBe(description)
    
    // get method using class method
    await task.get({id:id_task})
    expect(task.title).toBe(title)
    expect(task.description).toBe(description)

    // use update() to set completed
    task.completed = 1
    await task.update()

    // verify using knex connection
    foundTask = await conn("tasks").where({id:id_task}).first()
    expect(foundTask.completed).toBe(1)

})
    