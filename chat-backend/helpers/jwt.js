const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '6h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('Failed to generate token');
            }

            resolve(token);

        });

    })

}

module.exports = {
    generateJWT
}