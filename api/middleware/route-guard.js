'use strict';

const User = require('../models/users/user.model');
const {
  Network
} = require('../library/network.library');

const authenticate = (req, res, next) => {
  
  // next(); // <---- DO NOT FORGET TO REMOVE !!!
  // return;
  console.debug('[route-guard.authenticate]');
  try {
    const token = req.header('x-auth');
    // console.debug('[route-gouard.authenticate] token:', token);
    User.model.
      findByToken(token).
      then((user) => {
        // -- user is ID & role
        if (!user) {
          console.error('[E] User is null');
          return Promise.reject('User auth token not found');
        }
        // console.debug('[route-gouard.authenticate] token:', token);
        req.user = user;
        req.token = token;
        console.debug('--- Authenticate ---');
        console.debug('User  :', user);
        // console.debug('Token:', token);
        console.debug('--------------------');
        console.debug('[route-guard.authenticate]: Ok');
        next();
      }).
      catch((e) => {
        console.error('[E-401]:', e.message);
        return Network.replyError(res, Network.GET, 401, e.message, 'Authorization failed');
      });
  } catch (e) {
    console.error('[E-500]:', e.message);
    return Network.replyError(res, Network.GET, 500, e.message, 'Internal server error');
  }
};

module.exports = {
  authenticate
};
