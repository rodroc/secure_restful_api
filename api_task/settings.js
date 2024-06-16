const dotEnv = require('dotenv')

const setEnv = () =>{
    (async()=>{
        const argEnv = process.argv.find(f=>f===('--test' || '--dev') )
        // console.log({argEnv})
        switch(argEnv){
            case '--test':
                dotEnv.config({ path:__dirname + '/.env.test',override: true })
                break
            default:
                dotEnv.config({ path:__dirname + '/.env.dev',override: true })
                break
        }
    })()
}

module.exports = {
    setEnv
}