const { request, response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

// Model
const User = require( '../models/user.model' );


// End points
const getUsers = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .skip( Number( from ) )
      .limit( Number( limit ) )
  ]);

  res.status( 200 ).json({
    total,
    users
  });
}

const getUser = async( req = request, res = response ) => {
  const { id } = req.params; 

  const user = await User.findById( id );

  if ( !user.status ) {
    return res.status( 400 ).json({
      msg: 'There is no user with that id.'
    });
  }

  res.status( 200 ).json({
    user
  });
}

const createUser = async( req = request, res = response ) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt );

  await user.save();

  res.status( 201 ).json({
    user
  });
}

const updateUser = async( req = request, res = response ) => {
  const { id } = req.params; 
  const { _id, password, google, email, ...rest } = req.body;

  if ( password ) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate( id, rest, { new: true } );

  res.json({
    user
  });
}

const deleteUser = async( req = request, res = response ) => {
  const { id } = req.params; 
  const query = { status: false };
  const authUser = req.user;

  const user = await User.findByIdAndUpdate( id, query, { new: true } );

  res.json({
    user,
    authUser
  });
}


// Exports
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
