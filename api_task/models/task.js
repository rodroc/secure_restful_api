const knex = require("../lib/DB")

class Task{
    
    #db
    static #tableName = 'tasks'
    
    constructor(id_user){
        this.#db = knex.instance
        this.id_user = id_user
    }

    async find(andWhere={}){
        return await this.#db(Task.#tableName).where({id_user:this.id_user}).andWhere(andWhere)    
    }

    async select(andWhere={}){
        return await this.#db(Task.#tableName).where({id_user:this.id_user}).andWhere(andWhere)
    }

    async save(){
        const result = await this.#db(Task.#tableName).insert({id_user:this.id_user,title:this.title})
        this.id = result[0]
        return result[0]
    }
}

module.exports = Task