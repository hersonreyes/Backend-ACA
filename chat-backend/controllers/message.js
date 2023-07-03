const Message = require('../models/message');
const { response } = require("express");

// getChat - obtener el chat de los usuarios
const getChat = async(req, res = response) => {

    // Extraemos el uid del usuario que hace la petición
    const myUid = req.uid;
    // Extraemos el uid del usuario que recibe los mensajes
    const messagesFrom = req.params.from;

    // Buscamos los mensajes en la base de datos
    const last30 = await Message.find({
        $or: [
            { from: myUid, to: messagesFrom },
            { from: messagesFrom, to: myUid },
        ]
    })
    .sort({ createdAt: 'asc' })
    .limit(30);

    // Retornamos los mensajes
    res.json({
        ok: true,
        messages: last30
    });

}

// Exportamos los controladores
module.exports = {
    getChat
}