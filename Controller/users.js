const userRouter= require('express').Router()
const bcrypt= require('bcrypt')
const User = require('../Models/user')

userRouter.post('/', async(req,res)=> {
    const {Name, Email, Password} =  req.body
    const PasswordHash= await bcrypt.hash(Password,10)
    const user= new User ({
        Name,
        Email,
        PasswordHash
    })
    const savedUser= await user.save()
    res.json(savedUser)
})

module.exports= userRouter