const knex = require("../lib/DB")

class Task{
    
    #conn = knex.instance
    
    constructor(id_user){
        this.id_user = id_user
    }

    async find(andWhere={}){
        return await this.#conn('tasks').where({id_user:this.id_user}).andWhere(andWhere)    
    }

    async select(andWhere={}){
        return await this.#conn('tasks').where({id_user:this.id_user}).andWhere(andWhere)
    }
}

module.exports = Task