const jwt = require('jsonwebtoken');

// Función para generar el JWT
const generateJWT = ( uid ) => {

    // Retornamos una promesa
    return new Promise((resolve, reject) => {

        // Creamos el payload
        const payload = { uid };

        // Generamos el JWT con el payload, la semilla y el tiempo de expiración
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '6h'
        }, (err, token) => {

            // Si hay un error lo mostramos en consola y rechazamos la promesa
            if(err){
                console.log(err);
                reject('Failed to generate token');
            }

            // Si no hay error resolvemos la promesa con el token
            resolve(token);

        });

    })

}

// Función para verificar el JWT
const verifyJWT = ( token = '' ) => {
    try {
        // Verificamos el token y extraemos el uid
        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        return [true, uid];

    } catch (err) {
        return [false, null];
    }
}

// Exportamos las funciones para generar y verificar el JWT
module.exports = {
    generateJWT,
    verifyJWT
}