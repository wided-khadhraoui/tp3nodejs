const express = require('express');
const router = express.Router();
//create router register,login
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
//auth/login return message with html
router.get('/logintest',(req,res) =>{
    res.send("<h1>you are logged in ! </h1>")
});

//login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // ylwj 3al user
        const user = await User.findOne({ username });
        // yverifi
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mot de passe incorrect');
        }
        // ken l9ah yjeneri token
        const token = jwt.sign({ userId: user._id }, 'secret_key'); 
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//auth/register return page html 
router.get('/register1',(req,res) =>{
    res.sendFile(__dirname+"/index.html")
});
router.post('/register',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user = new User({username,password})
        await user.save();
        res.status(201).send('User registered succefully!');
    }catch(error){
        res.status(400).send(error.message)
    }
})
//5edma: login post
//model postfacebook + crud
module.exports=router;