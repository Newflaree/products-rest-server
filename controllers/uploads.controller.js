// NodeJS
const fs = require( 'fs' );
const path = require( 'path' );

// Express
const { request, response } = require( 'express' );

// Cloudinary
const cloudinary = require( 'cloudinary' ).v2;
cloudinary.config( process.env.CLOUDINARY_URL );

// Helpers
const { uploadFile } = require( '../helpers' );

// Models
const { User, Product } = require( '../models' );


// End points controllers
const fileUpload = async( req = request, res = response ) => {
  try {
    const completePath = await uploadFile( req.files, undefined, 'imgs' );

    res.json({
      name: completePath
    });
  } catch ( msg ) {
    res.status( 400 ).json({
      msg
    });
  }
}

const imageUpload = async( req = request, res = response ) => {
  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );

      if ( !model ) {
        return res.status( 400 ).json({
          msg: 'There is no user with that id'
        });
      }
      
      break;

    case 'products':
      model = await Product.findById( id );

      if ( !model ) {
        return res.status( 400 ).json({
          msg: 'There is no product with that id'
        });
      }
      
      break;

    default:
      return res.status( 500 ).json({
        msg: 'This end point is not yet validated'
      });
  }

  if ( model.img ) {
    const imagePath = path.join( __dirname, '../uploads', collection, model.img );

    if ( fs.existsSync( imagePath ) ) {
      fs.unlinkSync( imagePath );
    }
  }

  const fileName = await uploadFile( req.files, undefined, collection );
  model.img = fileName;

  await model.save();

  res.json({
    model
  });  
}

const uploadCloudinaryImage = async( req = request, res = response ) => {
  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );

      if ( !model ) {
        return res.status( 400 ).json({
          msg: 'There is no user with that id'
        });
      }
      
      break;

    case 'products':
      model = await Product.findById( id );

      if ( !model ) {
        return res.status( 400 ).json({
          msg: 'There is no product with that id'
        });
      }
      
      break;

    default:
      return res.status( 500 ).json({
        msg: 'This end point is not yet validated'
      });
  }

  if ( model.img ) {
    const cutName = model.img.split( '/' );
    const name = cutName[ cutName.length - 1 ];

    const [ public_id ] = name.split( '.' );
    await cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  model.img = secure_url;

  await model.save();

  res.json({
    model
  });  
}

const showImage = async( req = request, res = response ) => {
  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );

      if ( !model ) {
        return res.status( 400 ).json({
          msg: 'There is no user with that id'
        });
      }
      
      break;

    case 'products':
      model = await Product.findById( id );

      if ( !model ) {
        return res.status( 400 ).json({
          msg: 'There is no product with that id'
        });
      }
      
      break;

    default:
      return res.status( 500 ).json({
        msg: 'This end point is not yet validated'
      });
  }

  if ( model.img ) {
    const imagePath = path.join( __dirname, '../uploads', collection, model.img );

    if ( fs.existsSync( imagePath ) ) {
      return res.sendFile( imagePath )
    }
  }

  const imagePath = path.join( __dirname, '../assets/no-image.jpg' );

  res.sendFile( imagePath );
}


// Exports
module.exports = {
  fileUpload,
  imageUpload,
  showImage,
  uploadCloudinaryImage
}
