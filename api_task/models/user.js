const knex = require("../lib/DB")

class User{
    
    #db
    static #tableName = 'users'
    static #conn = knex.instance
    
    constructor(email,password,id=null){
        this.#db = knex.instance
        this.email=email
        this.password=password
        this.id=id
    }

    static async findOne(where={}){
        return await this.#conn(User.#tableName).where(where).first()
    }

    async save(){
        // User.#tableName
        const result = await this.#db(User.#tableName).insert({email:this.email,password:this.password})
        this.id = result[0]
        return result[0]
    }

    async saveToken(token){
        if( !this.id ) throw new Error(`Invalid userId`)
        await this.#db('users_tokens').insert({id_user:this.id,token})
    }
}

module.exports = User