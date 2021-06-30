require( 'colors' );
const express = require( 'express' );
const cors = require( 'cors' );

// Database
const dbConnection = require( '../database/config.db' );


class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT;

    // Paths
    this.apiPaths = {
      users: '/api/users'
    }

    // Connect to DB
    this.dbConnect();

    // Methods
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
    this.app.use( express.static( 'public' ) );
  }

  routes() {
    this.app.use( this.apiPaths.users, require( '../routes/user.route' ) );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.clear();
      console.log( `Listening on port ${ this.port }`.bgWhite.gray );
    });
  }
}


// Exports
module.exports = Server;
