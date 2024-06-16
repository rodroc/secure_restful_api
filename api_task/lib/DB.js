const Knex = require('knex')

// const config = 
// require('dotenv').config()
const settings = require('../settings')
settings.setEnv()

// console.log(process.env)
// console.log({config})
// console.log(config['DB_HOST'])
// console.log(config.parsed.DB_HOST)

class DBInstance{
    constructor(){}

    init(){
        if( process.env.NODE_ENV ){
            switch(process.env.NODE_ENV){
                case 'dev':
                    return this.initDev()
                case 'test':
                    return this.initTest()                    
                case 'prod':
                    return this.initProd()
                case 'replica':
                    return this.initReplica()
                default:
                    throw new Error(`Missing environment variable.`)
            }
        }
    }

    initDev(){
        return Knex({
            client: 'sqlite3',
            connection: {
                filename: '../db/tasks.db3',
            },
            // ssl: config['DB_SSL'] ? { rejectUnauthorized: false } : false,
            debug: true,
            useNullAsDefault: true,
            asyncStackTraces: true,
            pool: {min:0,max:10}
        })
    }

    initTest(){
        return Knex({
            client: 'sqlite3',
            connection: {
                filename: '../db/test.db3',
            },
            // debug: true,
            useNullAsDefault: true,
            asyncStackTraces: true,
            pool: {min:0,max:10}
        })
    }    

    initProd(){
        // TODO: configs for prod db
    }

    initReplica(){
        // TODO: configs for replica/read-only db
    }
}

const dbInstance = new DBInstance()
const instance = dbInstance.init()

module.exports = {
    instance,
    destroy: async() => {
        instance.destroy()
    }
}