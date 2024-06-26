const dotEnv = require('dotenv')

const setEnv = (alias='') =>{
    try{
        if( alias ){
            dotEnv.config({ path:__dirname + `/.env.${alias}`, debug: false, override: true })
        }else{
            const argEnv = process.argv.find(f=>f===('--test' || '--dev') )
            switch(argEnv){
                case '--test':
                    dotEnv.config({ path:__dirname + '/.env.test',override: true })
                    break
                default:
                    dotEnv.config({ path:__dirname + '/.env.dev',override: true })
                    break
                }
        }
    }catch(e){console.error(e)}
}

module.exports = {
    setEnv
}