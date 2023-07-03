const mongoose = require('mongoose');

// Función para conectar a la base de datos
const dbConnection = async() => {

    try {
        // Conectamos a la base de datos
        await mongoose.connect(process.env.DB_CNN);
        // Si todo sale bien mostramos el mensaje
        console.log('DB online');

    } catch(err) {
        // Si hay un error lo mostramos en consola y lanzamos un error
        console.log(err);
        throw new Error('Error connecting to database');
    }

}

// Exportamos la función para conectar a la base de datos
module.exports = {
    dbConnection
}