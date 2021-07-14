const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { categoryIdValidation } = require( '../helpers/db-validators.helper' );

// Middlewares
const { 
  validateFields, 
  validateJWT, 
  validateRole 
} = require( '../middlewares' );

// Controllers
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require( '../controllers/categories.controller' );


const router = Router();

router.get( '/', getCategories );

router.get( '/:id', [
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( categoryIdValidation ),
  validateFields
], getCategory );

router.post( '/', [
  validateJWT,
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  validateFields
], createCategory );

router.put( '/:id', [
  validateJWT,
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( categoryIdValidation ),
  validateFields
], updateCategory );

router.delete( '/:id', [
  validateJWT,
  validateRole,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( categoryIdValidation ),
  validateFields
], deleteCategory );


// Exports
module.exports = router;
