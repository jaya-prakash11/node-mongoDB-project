
const asyncHandler = require('express-async-handler')

//@desc register
//@route GET /api/user/register
//@access public
const registerUser = asyncHandler(async(req, res) =>{
    res.json({message:'user register'})
})

//@desc login
//@route GET /api/user/login
//@access public
const loginUser = asyncHandler(async(req, res) =>{
    res.json({message:'user login'})
})

//@desc login
//@route GET /api/user/current
//@access public
const currentUser = asyncHandler(async(req, res) =>{
    res.json({message:'current user'})
})


module.exports = {registerUser, loginUser, currentUser}