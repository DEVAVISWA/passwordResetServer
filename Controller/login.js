const User = require('../Models/user')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { JWT_SECRET } = require('../Utils/config')

const loginRouter= require('express').Router()

loginRouter.post('/', async(req,res)=> {
    const {Email,Password} = req.body
    const user= await User.findOne({Email}) 
    if(!user){
        return res.status(401).json({message:"user doesnt exist"})
    }
    const isAuthenticated=  bcrypt.compare(Password,user.passwordHash)
    if(!isAuthenticated){
        return res.status(400).json({message:'password is wrong'})
    }

    const payload={
        name:user.Name,
        email: user.Email,
        id:user._id
    }
    const token= jwt.sign(payload, JWT_SECRET,{expiresIn: '1h'})
    res.status(200).json({token,Name:user.Name,Email: user.Email})
})

module.exports= loginRouter