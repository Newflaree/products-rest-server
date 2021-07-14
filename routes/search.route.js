const { Router } = require( 'express' );

// Controllers
const { search } = require( '../controllers/search.controller' );


const router = Router();

router.get( '/:collection/:searchTerm', search );


// Exports
module.exports = router;
