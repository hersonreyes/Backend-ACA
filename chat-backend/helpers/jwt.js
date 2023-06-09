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

const verifyJWT = ( token = '' ) => {
    try {

        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        return [true, uid];

    } catch (err) {
        return [false, null];
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}