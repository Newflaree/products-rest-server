const { request, response } = require( 'express' );

const validateRole = ( req = request, res = response, next ) => {
  if ( !req.user ) {
    return res.status( 500 ).json({
      msg: 'You want to verify the role without validating the token before'
    });
  }

  const { role, name } = req.user;

  if ( role !== 'ADMIN_ROLE' ) {
    return res.status( 401 ).json({
      msg: `${ name } is not an administrator`
    });
  }

  next();
}

const hasRole = ( ...roles ) => {
  return ( req = request, res = response, next ) => {
    if ( !req.user ) {
      return res.status( 500 ).json({
        msg: 'You want to verify the role without validating the token before'
      });
    }

    if ( !roles.includes( req.user.role ) ) {
      return res.status( 401 ).json({
        msg: `The service will want one of the following roles: ${ roles }`
      });
    }

    next();
  }
}


// Exports
module.exports = {
  hasRole,
  validateRole,
}
