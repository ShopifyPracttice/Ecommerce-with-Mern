const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("../Models/User")

const router = express.Router();

router.post("/register", async (req, res) =>{
    const {firstname, lastname, username, password, userType} = req.body;
    const user = await UserModel.findOne({username});
    if(user){
    return res.json({message: "User Already Exists!", status: "wrong"})
    }

   const hashedPassword = await bcrypt.hash(password,10)

   const newUser = new UserModel({firstname, lastname, username, password: hashedPassword, userType})

   await newUser.save()
    res.json({message: "User Registered Successfully!", status: "ok"})

})

router.post("/login", async (req, res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
    if(!user){
        return res.json({message: "No Account find with this username!", status:"failed"})
    }
    const checkPassoword = await bcrypt.compare(password, user.password)

    if(!checkPassoword){
        return res.json({message: "Incorrect Username or password!", status:"wrong"})
    }

    const token = jwt.sign({id: user._id, username: user.username, name: user.firstname, userType: user.userType}, "secret123")
    res.json({token, userID: user._id, username: user.username})
})

module.exports = router