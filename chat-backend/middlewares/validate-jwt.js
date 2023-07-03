const { response } = require('express');
const jwt = require('jsonwebtoken');

// Middleware para validar el JWT
const validateJWT = (req, res = response, next) => {

    // x-token headers
    const token = req.header('x-token');

    // Si no hay token retornamos un error 401
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        });
    }

    try {
        // Verificamos el token y extraemos el uid
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Agregamos el uid a la request
        req.uid = uid;

    } catch (err) {
        // Si hay un error retornamos un error 401
        return res.status(401).json({
            ok:false,
            msg: 'Invalid token'
        })
    }

    // Si no hay error continuamos con el siguiente middleware
    next();

}

// Exportamos el middleware para validar el JWT
module.exports = {
    validateJWT
}