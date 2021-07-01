const { request, response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

// Models
const User = require( '../models/user.model' );

// Helpers
const { generateJWT } = require( '../helpers/generate-jwt.helper' );


// End points
const login = async( req = request, res = response ) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await User.findOne({ email });

    if ( !user ) {
      return res.status( 400 ).json({
        msg: 'Incorrect email or password'
      });
    }
    
    // Check if the user is active
    if ( !user.status ) {
      return res.status( 400 ).json({
        msg: 'Incorrect email or password'
      });
    } 

    // Check password
    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status( 400 ).json({
        msg: 'Incorrect email or password'
      });
    } 

    // Generate JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  } catch( err ) {
    console.log( err );
    return res.status( 500 ).json({
      msg: 'Something went wrong. Talk to the administrator'
    });
  }
}


// Exports
module.exports = {
  login
}
