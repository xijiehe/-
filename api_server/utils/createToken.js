const jwt =require('jsonwebtoken')
let config=require('../config/config')


const generateToken=(userInfo,time)=>{
    return jwt.sign(userInfo.toJSON(),config.jwt.secret,{
        expiresIn: time
    })
}
module.exports=generateToken;