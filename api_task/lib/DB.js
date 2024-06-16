const Knex = require('knex')

const settings = require('../settings')
settings.setEnv()

class DBInstance{
    constructor(){
    }

    set(env){
        if( env ){
            switch(env){
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
        }else throw new Error(`Missing environment variable.`)
    }

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
            debug: false,
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
    setEnv:env=>{
        const db = new DBInstance()
        const inst = db.set(env)
        return inst
    },
    instance,
    destroy: async() => {
        instance.destroy()
    }
}