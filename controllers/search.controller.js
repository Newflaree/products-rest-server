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

const searchCategories = async( term = '', res = response ) => {
  const isMongoId = ObjectId.isValid( term );

  if ( isMongoId ) {
    const category = await Category.findById( term ); 
     
    return res.status( 200 ).json({
      results: ( category ) ? [ category ] : []
    });
  }

  const regex = new RegExp( term, 'i' );

  const categories = await Category.find({ name: regex, status: true })

  res.status( 200 ).json({
    results: categories
  });
}

const searchProducts = async( term = '', res = response ) => {
  const isMongoId = ObjectId.isValid( term );

  if ( isMongoId ) {
    const product = await Product.findById( term )
                                 .populate( 'category', 'name' ); 
     
    return res.status( 200 ).json({
      results: ( product ) ? [ product ] : []
    });
  }

  const regex = new RegExp( term, 'i' );

  const products = await Product.find({ name: regex, status: true })
                                .populate( 'category', 'name' );

  res.status( 200 ).json({
    results: products
  });
}

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
  });

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
      searchCategories( searchTerm, res );
    break;

    case 'products':
      searchProducts( searchTerm, res );
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
