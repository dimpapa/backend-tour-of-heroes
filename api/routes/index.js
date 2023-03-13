'use strict';

const url = {
  heroes: '/api/heroes',
};

const { replyError } = require('../library/network');

const heroes_router = require('./heroes');


// -- Default Router serves "Page not found" error
function default_router(req, res, next)
{
  console.debug(`defaultRouter says: ${req.method} ${req.url}`);
  replyError({
    res,
    httpMethod: req.method,
    httpStatus: 404,
    message: 'Page not found'
  });
}

module.exports = {
  url,
  heroes: heroes_router,
  default: default_router
};
