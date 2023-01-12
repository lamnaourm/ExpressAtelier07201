const express = require('express'); 
const bcrypt = require('bcrypt'); 
const userModel = require('./models/userModel'); 

const routes = express.Router();


routes.post("/add", (req, res) => {

    const {login, email, firstname, lastname, password} = req.body;

    if(!login || !email || !firstname || !lastname || !password)
        return res.status(400).json({message: "donnee user non specifie"});

    bcrypt.genSalt(10, (err, salt) => {
        if(err)
            return res.status(500).json({message: "err generation de salt"});
        
        bcrypt.hash(password,salt, (err, hash)=> {
            if(err)
                return res.status(500).json({message: "err generation de hash"});

            const user = new userModel({...req.body, password:hash})

            user.save((err, user) => {
                if(!err)
                    res.status(200).json({message: 'creation de user reussie' })
                else 
                    return res.status(500).json({message: "err sauvegarde de user"});
            })
        })
    })
})

routes.get("/checklogin", (req, res) => {
    const {login,password} = req.body;

    if(!login || !password)
        return res.status(400).json({message: "donnee user non specifie"});

    userModel.findOne({login} , (err, user) => {
        if(err)
            return res.status(500).json({message: "err de findOne"});
        
        bcrypt.compare(password, user.password, (err, result) => {
            if(err)
                return res.status(500).json({message: "err de bcrypt.compare"});
            
            if(result)
                return res.status(200).json({message: "SUCESSS"});
            else 
                return res.status(500).json({message: "ERROR"});
        })
    })


})

routes.get("/checkemail", (req, res) => {
    
})

module.exports = routes; 



