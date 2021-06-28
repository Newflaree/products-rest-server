require( 'dotenv' ).config();

// Model
const Server = require( './models/server.model' );


const server = new Server();
server.listen();
