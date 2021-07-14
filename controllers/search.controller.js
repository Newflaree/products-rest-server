const { request, response } = require( 'express' );
const { ObjectId } = require( 'mongoose' ).Types;

// Models
const { User, Category, Product } = require( '../models' );

const allowedCollections = [
  'categories',
  'products',
  'roles',
  'users',
];

const searchUsers = async( term = '', res = response ) => {
  const isMongoId = ObjectId.isValid( term );

  if ( isMongoId ) {
    const user = await User.findById( term ); 
     
    return res.status( 200 ).json({
      results: ( user ) ? [ user ] : []
    });
  }

  const regex = new RegExp( term, 'i' );

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  })

  res.status( 200 ).json({
    results: users
  });
}

const search = ( req = request, res = response ) => {
  const { collection, searchTerm } = req.params;

  if ( !allowedCollections.includes( collection ) ) {
    return res.status( 400 ).json({
      msg: 'It is not a collection allowed'
    });
  }

  switch ( collection ) {
    case 'categories':
    break;
    case 'products':
    break;
    case 'users':
      searchUsers( searchTerm, res );
    break;
    default:
      res.status( 500 ).json({
        msg: 'Search not defined'
      });
  }
}


// Exports
module.exports = {
  search
}
