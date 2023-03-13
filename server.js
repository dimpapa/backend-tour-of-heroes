'use strict';

/**
 * Load environment variables
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
if ( process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

/**
 * Module dependencies
 */
const app = require('./app');
const http = require('http');
const { exit } = require('process');

/**
 * 
 * @param {Number|String} val The port number or named pipe,
 * the server listens on
 */
const normalizePort = (val) => {
  
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;  // Is it a named pipe?
  if (port >= 0) return port;   // Is it a port number?
  return false;                 // It is Nothing
};

/**
 * 
 * @param {Error} error 
 */
const onError = (error) => {
  if (error.syscall !== 'listen') throw error;

  const bind = (typeof port) === 'string' ? 'pipe ' + port : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const bind = (typeof port === 'string') ? 'pipe ' + port : 'port ' + port;
  console.debug(`Server: ${server.address().family}//${server.address().address}:${server.address().port}`);
  console.debug(`Listening on ${bind}`);
};

/**
 * Start server on host:port
 * Set handlers for erros
 */
const port = normalizePort(process.env.PORT || '3000');
const host = process.env.HOST || 'localhost';
//app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port, host);
