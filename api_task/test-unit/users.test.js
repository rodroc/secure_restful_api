const emailgenerator = require('email-generator')

const conn = require('../lib/DB').instance

test(`User Model`,async()=>{
    const userModel = require('../models/user')
    let email = emailgenerator.generateEmail().replaceAll('"','') //10,'gmail')
    const user = new userModel(email,'12345678')
    const id_user = await user.save()
    expect(id_user).toBeGreaterThan(0) 

    // find using knex connection
    let foundUser = await conn("users").where({email}).first()
    expect(foundUser.email).toBe(email)
    expect(foundUser.id).toBe(id_user)
    
    // find using User class method
    foundUser = await userModel.findOne({email})
    expect(foundUser.email).toBe(email)
    expect(foundUser.id).toBe(id_user)
})
    