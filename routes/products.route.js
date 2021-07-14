const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { 
  categoryIdValidation, 
  productIdValidation, 
  productValidation
} = require( '../helpers/db-validators.helper' );

// Middlewares
const { 
  validateJWT,
  validateFields,
  validateRole
} = require( '../middlewares' );

// Controllers
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require( '../controllers/products.controller' );


const router = Router();

router.get( '/', getProducts );

router.get( '/:id', [
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( productIdValidation ),
  validateFields
], getProduct );

router.post( '/', [
  validateJWT,
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  check( 'name' ).custom( productValidation ),
  check( 'category', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'category' ).custom( categoryIdValidation ),
  validateFields
], createProduct );

router.put( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( productIdValidation ),
  validateFields
], updateProduct );

router.delete( '/:id', [
  validateJWT,
  validateRole,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( productIdValidation ),
  validateFields
], deleteProduct );


// Exports
module.exports = router;
