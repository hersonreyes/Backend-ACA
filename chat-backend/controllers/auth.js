const { response } = require("express");
const User = require('../models/user');

const createUser = async(req, res = response) => {

    try {
        
        const { name, email, password } = req.body;

        //Verify Email 
        const existEmail = await User.findOne({ email });
        
        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        //Save User in DB
        const user = new User(req.body);
        await user.save();

        res.json({
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }

};

const login = async(req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Login',
        email,
        password
    });

};

const renewToken = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    });

};

module.exports = {
    createUser,
    login,
    renewToken
}