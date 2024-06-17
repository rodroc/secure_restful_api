const axios = require('axios'),
    emailgenerator = require('email-generator')

const dbRoutine = require('./dbroutine')

test(`Integration Test: Register and login user.`, async () => {

    await dbRoutine.truncate()

    const email = emailgenerator.generateEmail().replaceAll('"','') //10,'gmail')
    let req = axios.create({
        headers:{
            'Content-type':'application/json;charset=utf-8',
            'Accept':'application/json'
        },
        responseType: 'json',
        responseEncoding: 'utf8'
    })

    let url = 'http://localhost:3002/register'
    let res = null

    res = await req.post(url,{
        email, password: '12345678'
    })
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('token')
    expect(res.data.token).toEqual(expect.stringMatching(/^(.+)\.(.+)\.(.+)/))

    // register again but this time error should be returned and validated
    try{
        res = await req.post(url,{
            email,
            password: '12345678'
        })
    }catch(axiosError){ 
        expect(axiosError.response.status).toBe(400)
        expect(axiosError.response).toHaveProperty('data')
        expect(axiosError.response.data).toHaveProperty('error')
    }

    url = 'http://localhost:3002/login'
    res = await req.post(url,{
        email, password: '12345678'
    })
    expect(res.status).toBe(200)
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('token')
    expect(res.data.token).toEqual(expect.stringMatching(/^(.+)\.(.+)\.(.+)/))

})

