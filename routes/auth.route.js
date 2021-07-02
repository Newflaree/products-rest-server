const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Middlewares
const { validateFields } = require( '../middlewares' );

// Helpers
const { 
  emailValidation, 
} = require( '../helpers/db-validators.helper' );

// Controllers
const { login } = require( '../controllers/auth.controller' );


const router = Router();

router.post( '/login', [
  check( 'email', 'The email is mandatory' ).isEmail(),
  check( 'password', 'The password is mandatory' ).not().isEmpty(),
  validateFields
], login );


// Exports
module.exports = router;
