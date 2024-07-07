
const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc register
//@route GET /api/user/register
//@access public
const registerUser = asyncHandler(async(req, res) =>{

    try{
    const {username , email , password} = req.body;

    if(!username , !email , !password) {

        res.status(400)
        throw new Error('fields aremanditory')
    }
    const isUserFound =  await userModel.findOne({email})

    if(isUserFound){
        res.status(400);
        throw new Error('already exsists')
    }
        let hashedPassword = await bcrypt.hash(password,10)


        const user  = await userModel.create({
            username,
            email,
            password:hashedPassword
        })

        if(user){
            console.log('user', user)
            res.json({_id:user.id, email:user.email})
        }else{
            res.status(400).json({message:'user register'})
            throw new Error('user data not valid')
        }        


    }catch(error){
        console.log(error)
    }
})

//@desc login
//@route GET /api/user/login
//@access public
const loginUser = asyncHandler(async(req, res) =>{

        try{
            const {email , password} = req.body

            console.log('sadsa', email, password)
            if(!email || !password){
                res.status(400)
                throw new Error('fields are manditory')
            }

            let user  =  await userModel.findOne({email})

            console.log('isFound', user, (await bcrypt.compare(password, user.password) ))
            if(user && (await bcrypt.compare(password, user.password) )){
                
                let accessToken =  jwt.sign({
                    user:{
                        username: user.username ,
                        email:user.email,
                        id:user.id
                    }
                }, process.env.ACCESS_TOKEN_SECREATE,
                {expiresIn:'15m'}
            )

                res.status(200).json({accessToken:accessToken})
            }else{
                res.status(400)
                throw new Error('The user do not exsists')
            }
            

        }catch(err){
            console.log(err)
        }
})

//@desc login
//@route GET /api/user/current
//@access public
const currentUser = asyncHandler(async(req, res) =>{
    res.json(req.user)
})


module.exports = {registerUser, loginUser, currentUser}