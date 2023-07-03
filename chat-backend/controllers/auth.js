// importamos response para tener el tipado de la respuesta
const { response } = require("express");
// importamos bcrypt para encriptar la contraseña
const bcrypt       = require('bcryptjs');
// importamos el modelo de usuario
const User = require('../models/user');
// importamos el helper para generar el JWT
const { generateJWT } = require("../helpers/jwt");

// Creamos el controlador para crear un usuario
const createUser = async(req, res = response) => {

    try {
        //Extraemos el email y el password del body
        const { email, password } = req.body;

        //Verificamos si el email existe
        const existEmail = await User.findOne({ email });
        //Si existe retornamos un error
        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }
        //Si no existe creamos el usuario
        const user = new User(req.body);

        //Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        //Asignamos la contraseña encriptada al usuario
        user.password = bcrypt.hashSync(password, salt);

        //Guardamos el usuario en la base de datos
        await user.save();

        //Generamos el JWT
        const token = await generateJWT(user.id);

        //Si todo sale bien retornamos el usuario y el token
        res.json({
            ok: true,
            user,
            token
        });
        //Si hay un error lo mostramos en consola y retornamos un error 500
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }

};

// Creamos el controlador para el login
const login = async(req, res = response) => {
    // Extraemos el email y el password del body
    const { email, password } = req.body;

    try {
        //Buscamos el usuario por email
        const userDB = await User.findOne({ email });

        //Si no existe el usuario retornamos un error
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        //Validamos el password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        //Si el password no es valido retornamos un error
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        //Generamos el JWT
        const token = await generateJWT(userDB.id);
        //Si todo sale bien retornamos el usuario y el token
        res.json({
            ok: true,
            user: userDB,
            token
        });
        //Si hay un error lo mostramos en consola y retornamos un error 500
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }

};

// Creamos el controlador para renovar el token
const renewToken = async(req, res = response) => {
    //Extraemos el uid del usuario
    const uid = req.uid;

    //Generamos el nuevo JWT
    const token = await generateJWT(uid);

    //Obtenemos el usuario por el uid
    const user = await User.findById(uid);
    //Si no existe el usuario retornamos un error
    res.json({
        ok: true,
        user,
        token
    });

};
// Exportamos los controladores
module.exports = {
    createUser,
    login,
    renewToken
}