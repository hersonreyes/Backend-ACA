const { response } = require("express");

const createUser = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'New'
    });

};

const login = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'Login'
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