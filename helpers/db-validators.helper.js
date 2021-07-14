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

// Categories
const categoryIdValidation = async( id = '' ) => {
  const idExists = await Category.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no category with that id' );
  }
}

// Products
const productIdValidation = async( id = '' ) => {
  const idExists = await Product.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no product with that id' );
  }
}

const productValidation = async( name = '' ) => {
  const nameExists = await Product.findOne({ name })
  if ( nameExists ) {
    throw new Error( 'There is already a product with that name' );
  }
} 


module.exports = {
  categoryIdValidation,
  emailValidation,
  productIdValidation,
  productValidation,
  roleValidation,
  userIdValidation,
}
