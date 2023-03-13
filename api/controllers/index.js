/**
 * Controllers
 */

const options_controller = require('./options');
const heroes_controller = require('./heroes');

module.exports = {
  options: options_controller,
  heroes: heroes_controller,
};
