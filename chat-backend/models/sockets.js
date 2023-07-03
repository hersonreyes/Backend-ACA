const { userConnected, userDisconnected, getUsers, saveMessage } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

// Class Sockets - Configuración de sockets
class Sockets {

    // Constructor de la clase
    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    // socketEvents - Función para manejar los eventos de los sockets
    socketEvents() {
        // En este caso el evento de conexión es cuando un usuario se conecta
        this.io.on('connection', async( socket ) => {

            // Validar el JWT
            const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);

            // Si el JWT no es válido desconectamos el socket
            if(!valid){
                console.log('Unidentified socket');
                return socket.disconnect();
            }

            // Saber qué usuario está activo mediante el uid
            await userConnected( uid );

            // Agregar el usuario conectado al socket
            socket.join(uid);

            //Validate JWT

            //Know which user is active

            //Emit all connected users
            this.io.emit('users-list', await getUsers());

            //Socket join, uid

            //Escuchar cuando el cliente manda un mensaje
            socket.on('personal-message', async( payload ) => {
                const message = await saveMessage(payload);
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            });

            //Desconectar
            socket.on('disconnect', async() => {
                await userDisconnected( uid );
                this.io.emit('users-list', await getUsers());
            });

        });
    }


}


module.exports = Sockets;