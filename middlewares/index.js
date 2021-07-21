// Middlewares
const validateFields = require( './validate-fields.middleware' );
const validateFile = require( './validate-file.middleware' );
const validateJWT = require( './validate-jwt.middleware' );
const validateRoles = require( './validate-roles.middleware' );


// Exports
module.exports = {
  ...validateFields,
  ...validateFile,
  ...validateJWT,
  ...validateRoles
}
