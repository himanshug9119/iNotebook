const express = require('express')
const router = express.Router();
const User = require('../models/User')

//  create a user using: POST "/api/auth/". Doesn't require Auth, but will return an error if username already exists
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    User.findOne({ email }).then((userExist) => {
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const newUser = new User({ name, email, password });
        newUser.save().then(() => {
            res.send("User saved successfully");
        })  

    }).catch((err) => {
        console.log(err);
    })
})

// login 
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    User.findOne({ email }).then((userExist) => {
        if (!userExist) {
            return res.status(422).json({ error: "Invalid Email" });
        }
        if (userExist.password === password) {
            return res.json({ message: "Login successful" });
        } else {
            return res.status(422).json({ error: "Invalid Password" });
        }
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;