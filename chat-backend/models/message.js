const { Schema, model } = require('mongoose');

// Modelo de mensajes en la base de datos
const MessageSchema = Schema({

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

// Método para cambiar el _id por uid
MessageSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Exportamos el modelo de mensajes
module.exports = model('Message', MessageSchema);