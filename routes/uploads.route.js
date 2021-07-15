const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Middlewares
const { validateFields } = require( '../middlewares' );

// Controller
const { fileUpload } = require( '../controllers/uploads.controller' );


const router = Router();

router.post( '/', fileUpload );


// Exports
module.exports = router;
