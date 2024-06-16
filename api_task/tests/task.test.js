const axios = require('axios'),
    emailgenerator = require('email-generator'),
    { sentence } = require('txtgen/dist/cjs/txtgen.js')

const constants = require('../lib/constants') 

test(`Create and manage tasks.`, async () => {

    const email = emailgenerator.generateEmail().replaceAll('"','') //10,'gmail')
    let req = axios.create({
        headers:{
            'Content-type':'application/json;charset=utf-8',
            'Accept':'application/json'
        },
        responseType: 'json',
        responseEncoding: 'utf8'
    })

    let url = `${constants.testing.baseUrl}/register`
    let res = null

    res = await req.post(url,{
        email, password: '12345678'
    })
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('token')
    expect(res.data.token).toEqual(expect.stringMatching(/^(.+)\.(.+)\.(.+)/))

    url = `${constants.testing.baseUrl}/login`
    res = await req.post(url,{
        email, password: '12345678'
    })
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('token')
    expect(res.data.token).toEqual(expect.stringMatching(/^(.+)\.(.+)\.(.+)/))

    const token = res.data.token
    req = axios.create({
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type':'application/json;charset=utf-8',
            'Accept':'application/json'
        },
        responseType: 'json',
        responseEncoding: 'utf8'
    })

    url = `${constants.testing.baseUrl}/tasks`

    // save task #1
    let description = sentence()
    let title = description.substring(0,24)
    try{
        res = await req.post(url,{
            title,description
        })
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)

    // save task #2
    description = sentence()
    title = description.substring(0,24)
    try{
        res = await req.post(url,{
            title,description
        })
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)

    // save task #3
    description = sentence()
    title = description.substring(0,24)
    try{
        res = await req.post(url,{
            title,description
        })
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')

    let id_task = res.data.id
    url = `${constants.testing.baseUrl}/tasks/${id_task}`
    // delete task #3
    try{
        res = await req.delete(url)
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')

    // save task #4
    url = `${constants.testing.baseUrl}/tasks`
    description = sentence()
    title = description.substring(0,24)
    try{
        res = await req.post(url,{
            title,description
        })
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('id')

    id_task = res.data.id

    url = `${constants.testing.baseUrl}/tasks/${id_task}`

    // complete task #4

    title = res.data.hasOwnProperty('title')?res.data.title:''
    description = res.data.hasOwnProperty('description')?res.data.description:''
    let due_date = res.data.hasOwnProperty('due_date')?res.data.due_date:''
    let completed = 1 // data to update
    try{
        res = await req.put(url,{
            title,description,due_date,completed // set to complete
        })
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')

    // get all tasks
    url = `${constants.testing.baseUrl}/tasks`
    try{
        res = await req.get(url)
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('list')
    expect(res.data.list.length).toBe(3)

    // get all completed task
    url = `${constants.testing.baseUrl}/tasks?completed=1`
    try{
        res = await req.get(url)
    }catch(e){ console.error(e) }
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('list')
    expect(res.data.list.length).toBe(1)

})

