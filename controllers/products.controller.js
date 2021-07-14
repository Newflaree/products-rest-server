const { request, response } = require( 'express' );

// Model
const { Product } = require( '../models' );


// End points
const getProducts = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [ total, products ] = await Promise.all([
    Product.countDocuments( query ),
    Product.find( query )
      .populate( 'user', 'name' )
      .populate( 'category', 'name' )
      .skip( Number( from ) )
      .limit( Number( limit ) )
  ]);

  res.status( 200 ).json({
    total,
    products
  });
}

const getProduct = async( req = request, res = response ) => {
  const { id } = req.params;

  const product = await Product.findById( id )
    .populate( 'user', 'name' )
    .populate( 'category', 'name' );

  if ( !product.status ) {
    return res.status( 400 ).json({
      msg: 'There is no product with that ID'
    });
  }

  res.status( 200 ).json({
    product
  });
}

const createProduct = async( req = request, res = response ) => {
  const { status, user, ...body } = req.body;
  const name = body.name;
  const productDB = await Product.findOne({ name }); 

  if ( productDB ) {
    return res.status( 400 ).json({
      msg: `Product ${ productDB.name } already exists`
    });
  }

  const data = {
    ...body,
    name: name.toUpperCase(),
    user: req.user._id,
  }

  const product = new Product( data );

  await product.save();

  res.status( 201 ).json({
    product
  }); 
}

const updateProduct = async( req = request, res = response ) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;
 
  if ( data.name ) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate( id, data, { new: true } );

  res.status( 200 ).json({
    product
  });
}

const deleteProduct = async( req = request, res = response ) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );

  res.status( 200 ).json({
    deletedProduct
  });
}


// Exports
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
