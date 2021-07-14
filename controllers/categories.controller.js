const { request, response } = require( 'express' );

// Model
const { Category } = require( '../models' );

const getCategories = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [ total, categories ] = await Promise.all([
    Category.countDocuments( query ),
    Category.find( query )
      .populate( 'user', 'name' )
      .skip( Number( from ) )
      .limit( Number( limit ) ),
  ]);

  res.status( 200 ).json({
    total,
    categories,
  })
}

const getCategory = async( req = request, res = response ) => {
  const { id } = req.params;

  const category = await Category.findById( id ).populate( 'user', 'name' );

  if ( !category.status ) {
    return res.status( 400 ).json({
      msg: 'There is no category with that ID'
    });
  }

  res.status( 200 ).json({
    category
  });
}

const createCategory = async( req = request, res = response ) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if ( categoryDB ) {
    return res.status( 400 ).json({
      msg: `Category ${ categoryDB.name } already exists`
    }); 
  }

  const data = {
    name, 
    user: req.user._id
  }

  const category = new Category( data );

  await category.save();

  res.status( 201 ).json({
    category
  })
}

const updateCategory = async( req = request, res = response ) => {
  const { id } = req.params;
  const { _id, status, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate( id, data, { new: true } )
    .populate( 'user', 'name' );

  res.json({
    category,
    
  });
}

const deleteCategory = async( req = request, res = response ) => {
  const { id } = req.params;
  const query = { status: false };
  
  const category = await Category.findByIdAndUpdate( id, query, { new: true } )
    .populate( 'user', 'name' );

  res.json({
    category,
  });
}


// Exports
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
