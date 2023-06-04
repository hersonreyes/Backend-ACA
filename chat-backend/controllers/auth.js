const { response } = require("express");
const bcrypt       = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");

const createUser = async(req, res = response) => {

    try {
        
        const { email, password } = req.body;

        //Verify Email 
        const existEmail = await User.findOne({ email });
        
        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Save User in DB
        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
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