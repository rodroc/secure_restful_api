const emailgenerator = require('email-generator')

const settings = require('../settings'),
    conn = require('../lib/DB').instance

console.error('check JEST',process.env.AUTOMATED_TEST)
settings.setEnv('test')

// console.log('ENV',process.env.NODE_ENV)
// (async()=>{

    test(`User Model`,async()=>{
        // return
        // console.log(`${process.env.NODE_ENV}`)
        const userModel = require('../models/user')
        let email = emailgenerator.generateEmail().replaceAll('"','') //10,'gmail')
        const user = new userModel(email,'12345678')
        await user.save()
        // console.log({user}) 

        let foundUser = await conn("users").where({email}).first()
        console.log({foundUser})
        expect(foundUser.email).toBe(email) 
    
    })
    
    // test(`Doomed to fail`,()=>{
        // throw new Error(`Opps!`)
    // })

// })()
