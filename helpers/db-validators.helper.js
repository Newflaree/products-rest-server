// Models
const Role = require( '../models/role.model' );
const User = require( '../models/user.model' );

const roleValidation = async( role = '' ) => {
  const roleExists = await Role.findOne({ role })

  if ( !roleExists ) {
    throw new Error( `The role ${ role } is not registered` );
  }
}

const emailValidation = async( email = '' ) => {
  const emailExists = await User.findOne({ email })
  if ( emailExists ) {
    throw new Error( 'There is already a user with that email' );
  }
} 

const userIdValidation = async( id = '' ) => {
  const idExists = await User.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no user with that id.' );
  }
} 


module.exports = {
  emailValidation,
  userIdValidation,
  roleValidation,
}
