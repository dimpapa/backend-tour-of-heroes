'use strict';

/**
 * [CORS (Cross Origin Resource Sharing)]
 * Express middleware to handle CORS issues
 *
 * Set appropriate headers
 * -- Handles OPTIONS requests, responding, not forwarding
 */
const handle_cors = (req, res, next) => {
    // console.debug('Express [CORS] says: Setting headers');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth')

    // -- If request is for OPTIONS, move on
    // ** Defined an options route to handle that **
    //
    // if ( 'OPTIONS' === req.method) {
    //   res.status(200).json({message: 'OPTIONS, ok'});
    //   return;
    // }
    next();
}

module.exports = { cors: handle_cors }
