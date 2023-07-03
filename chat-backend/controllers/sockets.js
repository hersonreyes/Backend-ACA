const User = require('../models/user');
const Message = require('../models/message');

// userConnected - Marcar en línea a un usuario
const userConnected = async( uid ) => {
    // Buscamos el usuario por id
    const user = await User.findById(uid);
    // Marcamos al usuario como conectado
    user.online = true;
    // Guardamos los cambios
    await user.save(); 

    return user;
}

// userDisconnected - Marcar fuera de línea a un usuario
const userDisconnected = async( uid ) => {

    // Buscamos el usuario por id
    const user = await User.findById(uid);
    // Marcamos al usuario como desconectado
    user.online = false;
    // Guardamos los cambios
    await user.save(); 

    return user;
}

// getUsers - Obtener todos los usuarios
const getUsers = async() => {
    // Buscamos todos los usuarios
    const users = await User
        .find()
        .sort('-online');

    return users;
}

// saveMessage - Guardar un mensaje
const saveMessage = async( payload ) => {
    try {
        // Creamos una instancia del modelo Message
        const message = new Message(payload);
        // Guardamos el mensaje en la base de datos
        await message.save();
        return message;
    } catch (err) {
        // Si hay un error lo mostramos en consola y retornamos false
        console.log(err);
        return false;
    }
}

// Exportamos los controladores
module.exports = {
    userConnected,
    userDisconnected,
    getUsers,
    saveMessage
}