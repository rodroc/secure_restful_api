knex = require('../lib/DB')

const truncate = async() => {
    (async()=>{
        try{
            const conn = knex.setEnv('test')
            
            await conn('users').del()
            await conn('users').truncate()
        
            await conn('users_tokens').del()
            await conn('users_tokens').truncate()
        
            await conn('tasks').del()
            await conn('tasks').truncate()
            
            conn.destroy()
        }catch(e){console.error(e)}
    })()
}

module.exports = {
    truncate
}