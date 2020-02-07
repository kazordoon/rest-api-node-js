require('dotenv').config()

module.exports = {
  host: process.env.MARIADB_HOST,
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  },
  timezone: 'UTC',
  define: {
    timestamps: false
  }
}
