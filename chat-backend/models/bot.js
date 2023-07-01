const { Schema, model } = require('mongoose');

const BotSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    //Si el status es 1 el mensaje es del chatbot, si es 0 es del usuario
    status: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

BotSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Bot', BotSchema);