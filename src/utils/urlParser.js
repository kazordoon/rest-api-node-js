const { URL } = require('url')

module.exports = path => new URL(`${process.env.APP_HOST}:${process.env.PORT}/${path}`)
