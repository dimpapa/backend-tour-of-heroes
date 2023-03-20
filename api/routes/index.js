'use strict';

const url = {
  heroes: '/api/heroes',
  push: '/api/push'
};

const { replyError } = require('../library/network');

const heroes_router = require('./heroes');
const push_router = require('./push');


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
  push: push_router,
  heroes: heroes_router,
  default: default_router
};
