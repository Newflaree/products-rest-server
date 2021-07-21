require( 'colors' );
const express = require( 'express' );
const cors = require( 'cors' );
const fileUpload = require( 'express-fileupload' );

// Database
const dbConnection = require( '../database/config.db' );


class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT;

    // Paths
    this.apiPaths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      products:   '/api/products',
      search:     '/api/search',
      uploads:    '/api/uploads',
      users:      '/api/users',
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
    // Cors
    this.app.use( cors() );

    // Parse body
    this.app.use( express.json() );

    // Public directory
    this.app.use( express.static( 'public' ) );

    // File upload
    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use( this.apiPaths.auth,        require( '../routes/auth.route' ) );
    this.app.use( this.apiPaths.categories,  require( '../routes/categories.route' ) );
    this.app.use( this.apiPaths.products,    require( '../routes/products.route' ) );
    this.app.use( this.apiPaths.search,      require( '../routes/search.route' ) );
    this.app.use( this.apiPaths.uploads,     require( '../routes/uploads.route' ) );
    this.app.use( this.apiPaths.users,       require( '../routes/user.route' ) );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.clear();
      console.log( `Listening on port ${ this.port }`.bgBlack.white );
    });
  }
}


// Exports
module.exports = Server;
