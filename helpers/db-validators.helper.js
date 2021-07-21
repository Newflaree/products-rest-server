// Models
const { 
  Role, 
  User, 
  Category,
  Product
} = require( '../models' );


// Users
const roleValidation = async( role = '' ) => {
  const roleExists = await Role.findOne({ role })

  if ( !roleExists ) {
    throw new Error( `The role ${ role } is not registered` );
  }

  return true;
}

const emailValidation = async( email = '' ) => {
  const emailExists = await User.findOne({ email })
  if ( emailExists ) {
    throw new Error( 'There is already a user with that email' );
  }

  return true;
} 

const userIdValidation = async( id = '' ) => {
  const idExists = await User.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no user with that id.' );
  }

  return true;
} 

// Categories
const categoryIdValidation = async( id = '' ) => {
  const idExists = await Category.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no category with that id' );
  }

  return true;
}

// Products
const productIdValidation = async( id = '' ) => {
  const idExists = await Product.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no product with that id' );
  }

  return true;
}

const productValidation = async( name = '' ) => {
  const nameExists = await Product.findOne({ name })
  if ( nameExists ) {
    throw new Error( 'There is already a product with that name' );
  }

  return true;
} 

// Collections
const allowedCollections = ( collection = '', collections = [] ) => {
  const included = collections.includes( collection );
  if ( !included ) {
    throw new Error( `The ${ collection }'s collection is not allowed` );
  }

  return true;
}


module.exports = {
  allowedCollections,
  categoryIdValidation,
  emailValidation,
  productIdValidation,
  productValidation,
  roleValidation,
  userIdValidation,
}
