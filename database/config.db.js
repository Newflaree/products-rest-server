const mongoose = require( 'mongoose' );

const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log( 'Database ONLINE'.green );
  } catch ( err ) {
    console.log( err );
    throw new Error( 'Error to connect' );

  }
}


// Exports
module.exports = dbConnection;
