const Knex = require('knex')

const config = require('dotenv').config()

console.log(process.env)
console.log({config})
// console.log(config['DB_HOST'])
// console.log(config.parsed.DB_HOST)

class DBInstance{
    constructor(){
    }

    initDev(){
        return Knex({
            client: 'sqlite3',
            connection: {
                filename: '../db/tasks.db3',
            },
            /*connection:{
                host: process.env.DB_HOST?process.env.DB_HOST:config.parsed.DB_HOST,
                port: process.env.DB_PORT?process.env.DB_PORT:config.parsed.DB_PORT,
                user: process.env.DB_USER?process.env.DB_USER:config.parsed.DB_USER,
                password: process.env.DB_PASSWORD?process.env.DB_PASWORD:config.parsed.DB_PASSWORD,
                database: process.env.DB_NAME?process.env.DB_NAME:config.parsed.DB_NAME,
                // ssl: config['DB_SSL'] ? { rejectUnauthorized: false } : false,
            },*/
            debug: true,
            asyncStackTraces: true,
            pool: {min:0,max:10}
        })
    }

    initMaster(){
        // TODO: configs for master db
    }

    initReplica(){
        // TODO: configs for replica/read-only db
    }
}

const dbInstance = new DBInstance()
const dev = dbInstance.initDev()

module.exports = {
    dev,
    destroy: async() => {
        dev.destroy()
    }
}