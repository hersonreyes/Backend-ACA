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
    status: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

MessageSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Bot', BotSchema);