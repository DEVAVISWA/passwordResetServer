const userRouter= require('express').Router()
const bcrypt= require('bcrypt')
const User = require('../Models/user')

userRouter.post('/', async(req,res)=> {
    const {Name, Email, Password} =  req.body
    const passwordHash= await bcrypt.hash(Password,10)
    const user= new User ({
        Name,
        Email,
        passwordHash
    })
    const savedUser= await user.save()
    res.json(savedUser)
})

module.exports= userRouter