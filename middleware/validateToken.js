const asyncHandler = require('express-async-handler');
const  jwt = require('jsonwebtoken');


const validateAccessToken = asyncHandler(async(req, res , next)=>{
    try{
        console.log("start")
        let token ;
        let authHeader = req.headers.authorization || req.headers.Authorization
        if(authHeader && authHeader.startsWith('Bearer')){
            token = authHeader.split(' ')[1];


            if(token){
                jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE,(err, decode)=>{
                    if(err){
                        res.json({message:'401'});
                        throw new Error('not authorozed');
                    }

                    req.user = decode.user;
                    next();
                    
                })
            }else{
                res.json({message:'token is not there'})
            }

        }else{
            res.json({message:'something wrong'});
        }
        console.log("end")

    }catch(err){
        console.log(err)
    }
})
module.exports = validateAccessToken;
