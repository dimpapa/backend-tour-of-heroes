'use strict';

/**
 * Module dependencies
 */

// -- Global library imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

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

// -- Handle errors (invalid paths)
app.use(apiRoutes.default);

// -- Exports
module.exports = app;
