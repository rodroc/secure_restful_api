const knex = require("../lib/DB")

class User{
    
    static #conn = knex.instance
    
    constructor(email,password,id=null){
        this.email=email
        this.password=password
        this.id=id
    }

    static async find(where={}){
        return await this.#conn('users').where(where).first()
    }
}

module.exports = User