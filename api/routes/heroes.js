'use strict';

const express = require('express');
const { heroes, options } = require('../controllers');

const router = express.Router();

/*
 * Routes - Actions
 */

// -- Heroes' Routes - /api/heroes

// -- get all published heroes
router.get('/', heroes.get.published);
router.get('/id/:id', heroes.get.oneById);

// -- options
router.options('/', options);

module.exports = router;
