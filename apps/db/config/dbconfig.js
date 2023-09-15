/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const {
  DB_HOST,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_DIALECT,
  DB_NAME
} = process.env

console.log(DB_HOST)

module.exports = {
  development: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  test: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  production: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  }
}

// module.exports = {
//   development: {
//     username: 'root',
//     password: null,
//     database: 'crud_example_db',
//     host: '127.0.0.1',
//     dialect: 'mysql'
//   },
//   test: {
//     username: 'root',
//     password: null,
//     database: 'database_test',
//     host: '127.0.0.1',
//     dialect: 'mysql'
//   },
//   production: {
//     username: 'root',
//     password: null,
//     database: 'database_production',
//     host: '127.0.0.1',
//     dialect: 'mysql'
//   }
// }
