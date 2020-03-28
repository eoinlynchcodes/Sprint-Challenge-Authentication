const knex = require('knex');

const config = require('../knexfile');

// const db = knex(config.development);

// module.exports = db;

const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);