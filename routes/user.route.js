const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Middlewares
const { 
  validateFields, 
  validateJWT, 
  validateRole 
} = require( '../middlewares' );

// Helpers
const { 
  roleValidation, 
  emailValidation, 
  userIdValidation 
} = require( '../helpers/db-validators.helper' );

// Controllers
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require( '../controllers/user.controller' );


const router = Router();

router.get( '/', getUsers );

router.get( '/:id', [
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userIdValidation ),
  validateFields
], getUser );

router.post( '/', [
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  check( 'password', 'Password must be longer than 6 characters' ).isLength({ min: 6 }),
  check( 'email', 'The email is not valid' ).isEmail(),
  check( 'email' ).custom( emailValidation ),
  check( 'role' ).custom( roleValidation ),
  validateFields
] ,createUser );

router.put( '/:id', [
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userIdValidation ),
  check( 'role' ).custom( roleValidation ),
  validateFields
], updateUser );

router.delete( '/:id', [
  validateJWT,
  validateRole,
  //hasRole( 'ADMIN_ROLE', 'SALES_ROLE' ),
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userIdValidation ),
  validateFields
], deleteUser );


// Exports
module.exports = router;
