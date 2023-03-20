'use strict';

/**
 * Module dependencies
 */

// -- Global library imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const web_push = require('web-push');

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    console.error(
        "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
        "environment variables. You can use the following ones:"
    );
    console.error(web_push.generateVAPIDKeys());
    return;
}

// Set the keys used for encrypting the push messages.
web_push.setVapidDetails(
    "http://localhost",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

// -- Local library imports
const db = require('./api/library/knex');

// -- Load some middleware
const { cors } = require('./api/middleware/cors');

// -- Load Routes
const apiRoutes = require('./api/routes');

// -- Initialize Express
const app = express();

// -- For all requests get a valid parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/**
 * Routing
 */
// -- Allow CORS (Cross Origin Resource Sharing)
app.use(cors);

// -- Use routes, define root path
app.use(apiRoutes.url.heroes, apiRoutes.heroes);
app.use(apiRoutes.url.push, apiRoutes.push);

// -- Handle errors (invalid paths)
app.use(apiRoutes.default);

// -- Exports
module.exports = app;
