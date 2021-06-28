const { request, response } = require( 'express' );


// End points
const getUsers = ( req = request, res = response ) => {
  res.json({
    msg: 'get users'
  });
}

const getUser = ( req = request, res = response ) => {
  res.json({
    msg: 'get user'
  });
}

const createUser = ( req = request, res = response ) => {
  res.json({
    msg: 'create a user'
  });
}

const updateUser = ( req = request, res = response ) => {
  res.json({
    msg: 'update a user'
  });
}

const deleteUser = ( req = request, res = response ) => {
  res.json({
    msg: 'delete a user'
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
