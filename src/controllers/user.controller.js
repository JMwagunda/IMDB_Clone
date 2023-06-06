const User = require("../model/userSchema.model");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");


Router.post("/register", async(req,res)=>{

    try {
        const {user, email, password, role} = req.body;

        const ispresent = await User.findOne({email});

        if(ispresent)
        {
            return res.send("user is already registered");
            
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        
        const createduser = await User.create({user, email, password: hashedpassword, role})

        return res.send(createduser);
    } 
        catch (error) {
        res.send({error: error.message});
    }
})

Router.post("/login", async(req,res)=>{

    try {

        const {email, password} = req.body;

        const ispresent = await User.findOne({email});

        if(!ispresent)
        {
            return res.send("user is not registered");
            
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.send("Invalid password");
        }

        const payload = {userId: ispresent._id, role:ispresent.role}
        const token = jwt.sign(payload, "judd", {expiresIn:"2h"});

        return res.send({message:"Logged in successfully", token:token}); 
    } 
        catch (error) {
        res.send({error:error.message});
    }
});


module.exports = Router;