const { userConnected, userDisconnected, getUsers, saveMessage } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);

            if(!valid){
                console.log('Unidentified socket');
                return socket.disconnect();
            }

            await userConnected( uid );

            //Join user to socket.io room
            socket.join(uid);

            //Validate JWT

            //Know which user is active

            //Emit all connected users
            this.io.emit('users-list', await getUsers());

            //Socket join, uid

            //Listen when a client sends message
            socket.on('personal-message', async( payload ) => {
                const message = await saveMessage(payload);
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            });

            //Disconnect
            socket.on('disconnect', async() => {
                await userDisconnected( uid );
                this.io.emit('users-list', await getUsers());
            });

        });
    }


}


module.exports = Sockets;