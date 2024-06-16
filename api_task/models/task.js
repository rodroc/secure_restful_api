const knex = require("../lib/DB")

class Task{
    
    #db
    static #tableName = 'tasks'

    id = 0
    title = ``
    description = ``
    due_date = ``
    completed = 0
    
    constructor(id_user){
        this.#db = knex.instance
        this.id_user = id_user
    }

    async get(andWhere={}){
        const item = await this.#db(Task.#tableName).where({id_user:this.id_user}).andWhere(andWhere).first()
        this.id = item? item.id: 0
        return item
    }

    async select(andWhere={}){
        return await this.#db(Task.#tableName).where({id_user:this.id_user}).andWhere(andWhere)
    }

    async save(){
        // TODO: add validation
        if( !this.id_user ) throw new Error(`Requires authentication.`)
        const result = await this.#db(Task.#tableName).insert({
            id_user:this.id_user,
            title:this.title,
            description: this.description,
            due_date:this.due_date,
            completed:this.completed
        })
        this.id = result[0]
        return result[0]
    }

    async update(){
        if( !this.id ) throw new Error(`Identifier is required.`)
        return await this.#db(Task.#tableName).where({id:this.id}).update({
            title:this.title,
            description: this.description,
            due_date:this.due_date,
            completed:this.completed
        })
    }

    async delete(id){
        return await this.#db(Task.#tableName).where({id,id_user:this.id_user}).delete()
    }
}

module.exports = Task