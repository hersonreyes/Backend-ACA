const { Schema, model } = require('mongoose');

// Modelo de usuarios en la base de datos
const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

// Sobreescribimos el método toJSON para que no retorne el password
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

// Exportamos el modelo de usuario
module.exports = model('User', UserSchema);