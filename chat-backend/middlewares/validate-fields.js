const { response } = require('express');
const { validationResult } = require('express-validator');

// Middleware para validar los campos
const validateFields = (req, res = response, next) => {

    // Extraemos los errores de la validación
    const errors = validationResult( req ); 
    // Si hay errores retornamos un error 400
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    // Si no hay errores continuamos con el siguiente middleware
    next();
}

// Exportamos el middleware para validar los campos
module.exports = {
    validateFields
}