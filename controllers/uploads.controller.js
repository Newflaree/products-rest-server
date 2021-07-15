const path = require( 'path' ); 
const { v4: uuidv4 } = require('uuid');
 
const { request, response } = require( 'express' );


const fileUpload = ( req = request, res = response ) => {
  if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {
    res.status( 400 ).json({
      msg: 'No files were uploaded'
    });

    return;
  }

  const { file } = req.files;


  const cutName = file.name.split( '.' );
  const extension = cutName[ cutName.length -1 ];

  const allowedExtensions = [ 'jpg', 'png', 'jpeg', 'gif' ]; 

  if ( !allowedExtensions.includes( extension ) ) {
    return res.status( 400 ).json({
      msg: `The ${ extension } extension is not allowed`
    });
  }

  const tempName = uuidv4() + '.' + extension;
  const uploadPath = path.join( __dirname, '../uploads/', tempName );

  file.mv( uploadPath, ( err ) => {
    if ( err ) {
      return res.status( 500 ).json({ err });
    }

    res.json({
      msg: `File uploaded to ${ uploadPath }` 
    });
  });
}


// Exports
module.exports = {
  fileUpload
}
