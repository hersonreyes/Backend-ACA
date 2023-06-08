

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            //Validate JWT

            //Know which user is active

            //Emit all connected users

            //Socket join, uid

            //Listen when a client sends message

            //Disconnect
        
        });
    }


}


module.exports = Sockets;