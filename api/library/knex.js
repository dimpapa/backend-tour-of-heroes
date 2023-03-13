const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    debug: false,
    pool: { min: 0, max: 7},
    acquireConnectionTimeout: 10000 // default is 60sec (this is 10'sec)
  });

module.exports = knex;
