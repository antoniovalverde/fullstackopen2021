require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'tests') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

const SECRETO = process.env.SECRETO

module.exports = {
  MONGODB_URI,
  PORT,
  SECRETO
}