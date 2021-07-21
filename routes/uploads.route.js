const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Middlewares
const { validateFields, validateFile } = require( '../middlewares' );

// Helpers
const { allowedCollections } = require( '../helpers' );

// Controller
const { 
  fileUpload, 
  imageUpload, 
  showImage,
  uploadCloudinaryImage
} = require( '../controllers/uploads.controller' );


const router = Router();

router.get( '/:collection/:id', [
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  validateFields
], showImage );

router.post( '/', validateFile, fileUpload );

router.put( '/:collection/:id', [
  validateFile,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'products' ] ) ),
  validateFields
], uploadCloudinaryImage );


// Exports
module.exports = router;
