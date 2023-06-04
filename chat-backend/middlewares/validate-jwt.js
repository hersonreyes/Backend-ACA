const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    // x-token headers
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;

    } catch (err) {
        return res.status(401).json({
            ok:false,
            msg: 'Invalid token'
        })
    }

    next();

}

module.exports = {
    validateJWT
}