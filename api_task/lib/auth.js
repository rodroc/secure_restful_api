const jwt = require('jsonwebtoken')

const constants = require('../lib/constants'),
    knex = require('../lib/DB')
    
conn = knex.instance

const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,constants.security.jwtSignatureText)
        const foundToken = await conn('users_tokens').where({id_user:decoded._id,token}).first()
        if( !foundToken ) throw new Error()
        req.userId = foundToken.id_user
        next()
    }catch(error){
        console.error(error)
        return res.status(401).send({error:`Please authenticate.`})
    }
}

const generateAuthToken = async identifier =>{
    const token = jwt.sign({ _id: identifier.toString() },constants.security.jwtSignatureText,{expiresIn: constants.security.jwtExpiresIn})
    return token
}

module.exports = {
    auth,
    generateAuthToken
}