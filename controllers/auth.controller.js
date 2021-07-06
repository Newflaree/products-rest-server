const { request, response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

// Models
const User = require( '../models/user.model' );

// Helpers
const { generateJWT } = require( '../helpers/generate-jwt.helper' );
const { googleVerify } = require( '../helpers/google-verify.helper' );


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

const googleSignin = async( req = request, res = response ) => {
  const { id_token } = req.body;

  try {

    const { email, name, img } = await googleVerify( id_token );

    let user = await User.findOne({ email });

    if ( !user ) {
      const data = {
        name,
        email,
        password: '',
        img,
        google: true
      };

      user = new User( data );
      await user.save();
    }

    if ( !user.status ) {
      return res.status( 401 ).json({
        msg: 'Talk to the administrator, user blocked'
      });
    }

    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    }); 

  } catch( err ) {
    res.status( 400 ).json({
      msg: 'Google token is not valid'
    });
  }
}


// Exports
module.exports = {
  googleSignin,
  login
}
